'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type * as THREETypes from 'three';
import styles from './projects.module.css';
import { useLang } from '@/context/LanguageContext';

function ModelViewer({ file }: { file: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const el = mountRef.current!;

    let animId = 0;
    let renderer: any = null;
    let composer: any = null;
    let cancelled = false;

    async function init() {
      try {
        const THREE = await import('three') as typeof THREETypes;
        const { GLTFLoader }    = await import('three/examples/jsm/loaders/GLTFLoader.js') as any;
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js') as any;
        const { EffectComposer }= await import('three/examples/jsm/postprocessing/EffectComposer.js') as any;
        const { RenderPass }    = await import('three/examples/jsm/postprocessing/RenderPass.js') as any;
        const { UnrealBloomPass}= await import('three/examples/jsm/postprocessing/UnrealBloomPass.js') as any;
        const { ShaderPass }    = await import('three/examples/jsm/postprocessing/ShaderPass.js') as any;
        const { FXAAShader }    = await import('three/examples/jsm/shaders/FXAAShader.js') as any;

        if (cancelled) return;

        const w = el.clientWidth  || 700;
        const h = el.clientHeight || 460;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0ede8);
        scene.fog = new THREE.FogExp2(0xf0ede8, 0.06);

        const camera = new THREE.PerspectiveCamera(42, w / h, 0.01, 100);
        camera.position.set(0, 0.6, 3.2);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        el.appendChild(renderer.domElement);

        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.08, 0.4, 0.95);
        composer.addPass(bloom);

        const fxaa = new ShaderPass(FXAAShader);
        fxaa.uniforms['resolution'].value.set(1 / w, 1 / h);
        composer.addPass(fxaa);

        scene.add(new THREE.AmbientLight(0xffffff, 1.4));

        const key = new THREE.DirectionalLight(0xfff6e8, 2.0);
        key.position.set(5, 9, 6);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.bias = -0.001;
        scene.add(key);

        const fillL = new THREE.DirectionalLight(0xd0e8ff, 0.8);
        fillL.position.set(-6, 3, 2);
        scene.add(fillL);

        const bounce = new THREE.DirectionalLight(0xfff0d8, 0.5);
        bounce.position.set(0, -4, 3);
        scene.add(bounce);

        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(10, 10),
          new THREE.MeshStandardMaterial({ color: 0xe8e4de, roughness: 0.9, metalness: 0.0 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.92;
        floor.receiveShadow = true;
        scene.add(floor);

        const grid = new THREE.GridHelper(10, 28, 0xcccccc, 0xdddddd);
        const gridMat = grid.material as THREETypes.Material & { opacity: number; transparent: boolean };
        gridMat.opacity = 0.5;
        gridMat.transparent = true;
        grid.position.y = -0.915;
        scene.add(grid);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping   = true;
        controls.dampingFactor   = 0.055;
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 0.8;
        controls.enablePan       = false;
        controls.minDistance     = 1.0;
        controls.maxDistance     = 8;
        controls.maxPolarAngle   = Math.PI * 0.76;

        const loader = new GLTFLoader();
        loader.load(
          file,
          (gltf: any) => {
            if (cancelled) return;
            const model = gltf.scene as THREETypes.Group;

            model.traverse((child: THREETypes.Object3D) => {
              const mesh = child as THREETypes.Mesh;
              if (mesh.isMesh) {
                mesh.castShadow    = true;
                mesh.receiveShadow = true;
              }
            });

            const box    = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size   = box.getSize(new THREE.Vector3());
            const scale  = 1.8 / Math.max(size.x, size.y, size.z);
            model.scale.setScalar(scale);
            model.position.sub(center.multiplyScalar(scale));
            model.position.y += 0.05;

            scene.add(model);
            setStatus('ready');
          },
          undefined,
          () => {
            setErrorMsg(`"${file}" nav atrasts — kopē .glb uz /public/models/`);
            setStatus('error');
          }
        );

        const onResize = () => {
          const nw = el.clientWidth;
          const nh = el.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
          composer.setSize(nw, nh);
          fxaa.uniforms['resolution'].value.set(1 / nw, 1 / nh);
        };
        window.addEventListener('resize', onResize);

        const loop = () => {
          animId = requestAnimationFrame(loop);
          controls.update();
          composer.render();
        };
        loop();

        return () => window.removeEventListener('resize', onResize);

      } catch (err) {
        console.error(err);
        setErrorMsg('Izpildi: npm install three @types/three');
        setStatus('error');
      }
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (renderer) {
        try { el.removeChild(renderer.domElement); } catch { /* already removed */ }
        renderer.dispose();
      }
    };
  }, [file]);

  return (
    <div className={styles.viewerOuter}>
      <div className={styles.viewerLabel}>
        <span className={styles.viewerDot} />
        3D modelis · interaktīvs
      </div>
      <div className={styles.viewer}>
        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.tr}`} />
        <span className={`${styles.corner} ${styles.bl}`} />
        <span className={`${styles.corner} ${styles.br}`} />

        <div
          ref={mountRef}
          className={styles.canvas}
          style={{ opacity: status === 'ready' ? 1 : 0, transition: 'opacity 0.6s ease' }}
        />

        {status === 'loading' && (
          <div className={styles.overlay}>
            <div className={styles.spinner} />
            <span>Ielādē modeli…</span>
          </div>
        )}
        {status === 'error' && (
          <div className={styles.overlay}>
            <span className={styles.errIcon}>⚠</span>
            <p className={styles.errTitle}>3D modelis nav pievienots</p>
            <p className={styles.errSub}>{errorMsg}</p>
          </div>
        )}
        {status === 'ready' && (
          <div className={styles.hint}>
            <span>↻ velc, lai grieztu</span>
            <span className={styles.hintDiv} />
            <span>scroll, lai tuvinātu</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// id: used as the scroll anchor — must match PROJECTS_PREVIEW in home page.tsx
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'antweight',
    titleLV: 'Antweight 454g sacensību robots',
    titleEN: 'Antweight 454g combat robot',
    date: '2024 — tagad / now',
    badgeLV: '🏆 RoboChallenge 2025 · Top 16 Eiropā',
    badgeEN: '🏆 RoboChallenge 2025 · Top 16 Europe',
    green: true,
    descLV: 'Antweight kategorijas sacensību robots robotu cīņām. Mērķis — pēc iespējas efektīvs, izturīgs un viegls robots, ievērojot svara ierobežojumu. Katrs grams un katra konstrukcijas izvēle ir svarīga.',
    descEN: 'Antweight class combat robot built for robot fighting competitions. Goal — the most efficient, durable and lightweight robot possible within the weight limit. Every gram and every design choice matters.',
    contribLV: 'Izstrādāju robota konstrukciju, veidoju detaļu dizainu Fusion 360 un testēju sacensību apstākļos. Meklēju līdzsvaru starp svaru, izturību, jaudu un vadāmību.',
    contribEN: 'Designed the robot structure, created part geometry in Fusion 360, tested under competition conditions. Balanced weight, durability, power and controllability.',
    learnedLV: 'Projekts iemācīja domāt ne tikai vai risinājums darbojas, bet vai izturēs triecienus un sacensību tempu.',
    learnedEN: 'Taught me to think not just whether a solution works, but whether it will survive impacts and competition pace.',
    skills: ['Fusion 360', '3D printēšana / 3D printing', 'Elektronika / Electronics', 'Testēšana / Testing'],
    links: [{ label: 'Fusion 360 ↗', href: 'https://a360.co/4j2iNXR' }],
    images: ['/img1.png'],
    modelFile: '/models/antweight.glb',
  },
  {
    id: 'folkrace',
    titleLV: 'Robotu Folkrace',
    titleEN: 'Robot Folkrace',
    date: '2023 — tagad / now',
    badgeLV: 'Latvijas robotikas sacensības',
    badgeEN: 'Latvian robotics competitions',
    green: false,
    descLV: 'Sacensību robots kurā apvienota mehāniskā konstrukcija, elektronikas shēmas un vadības sistēmas programmēšana. Sensori, kustības loģika, sacensību optimizācija.',
    descEN: 'Competition robot combining mechanical design, electronics and control system programming. Sensors, motion logic, competition optimisation.',
    contribLV: '3D detaļu projektēšana Fusion 360, elektronikas risinājumu plānošana, vadības sistēmas programmēšana un sensoru integrācija.',
    contribEN: '3D part design in Fusion 360, electronics planning, control system programming and sensor integration.',
    learnedLV: 'Robotikā svarīgi savienot mehānisko izturību, elektronikas uzticamību un precīzu vadības loģiku.',
    learnedEN: 'In robotics it is critical to connect mechanical durability, electronics reliability and precise control logic.',
    skills: ['Fusion 360', '3D printēšana', 'Elektronika', 'Programmēšana', 'Sensori'],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/Linards888/Folkrace' },
      { label: 'Fusion 360 v1 ↗', href: 'https://a360.co/3O1SIhj' },
      { label: 'Brushless Folk ↗', href: 'https://a360.co/4bVA5Ug' },
      { label: 'FolkNEW ↗', href: 'https://a360.co/47p1zAb' },
    ],
    images: ['/folkrace.png', '/traktors.png'],
    modelFile: ['/models/VentspilsHack.glb', '/models/Traktors.glb'],
  },
  {
    id: 'LATA',
    titleLV: 'LATA Hakatons un Ideju Ģenerators 2023',
    titleEN: 'LATA Hackathon and Idea Generator 2023',
    date: '2023',
    badgeLV: '🏆  3.VIETA',
    badgeEN: '🏆  3.PLACE',
    green: true,
    descLV: '“LATA hakatons un ideju ģenerators 2023” bija tehnoloģiju un inovāciju pasākums, kur komandas īsā laikā izstrādāja un prezentēja risinājumus dažādām problēmām, izmantojot programmēšanu, dizainu un radošu domāšanu.',
    descEN: '“LATA Hackathon and Idea Generator 2023” was a technology and innovation event where teams rapidly developed and presented solutions to various challenges using programming, design, and creative thinking.',
    contribLV: 'Piedalījos idejas izstrādē un tās prezentēšanā, palīdzēju ar tehnisko un radošo risinājuma daļu. Ieguvām 3. vietu ideju ģeneratora kategorijā.',
    contribEN: 'I participated in developing and presenting the idea, contributing to both the technical and creative parts of the solution. Our team achieved 3rd place in the Idea Generator category.',
    learnedLV: 'Ātri ģenerēt un attīstīt idejas, strādāt komandā zem laika spiediena, kā arī uzlabot prasmes prezentēt tehnisku risinājumu.',
    learnedEN: 'How to quickly generate and develop ideas, work under time pressure in a team, and improve my skills in presenting technical solutions.',
    skills: ['3D modelēšana', 'Elektronika', 'Vadības sistēmas', 'Prototipēšana'],
    links: [],
    images: ['/DatuHakatons_LATA.jpg'],
    modelFile: null,
  },
  {
    id: 'simulator',
    titleLV: 'DIY braukšanas simulators',
    titleEN: 'DIY driving simulator',
    date: '2025 — tagad / now',
    badgeLV: 'Aktīvā izstrādē',
    badgeEN: 'In active development',
    green: false,
    descLV: 'Pašbūvēts braukšanas simulators ar stūri, pedāļiem un vadības elektroniku. Tiek attīstīts ar FPV kameru sistēmu priekš attālinātas VR vadības.',
    descEN: 'Self-built driving simulator with steering wheel, pedals and control electronics. Being extended with an FPV camera system for remote VR driving.',
    contribLV: '3D detaļu izstrāde, elektronikas integrācija, vadības sistēmas konfigurēšana un VR sistēmas plānošana.',
    contribEN: '3D part design, electronics integration, control system configuration and VR system planning.',
    learnedLV: 'Fiziskas vadības ierīces + digitāla sistēma — precizitāte ir svarīgāka par ātrdarbību.',
    learnedEN: 'Physical controls + digital system — precision matters more than speed.',
    skills: ['3D modelēšana', 'Elektronika', 'Vadības sistēmas', 'Prototipēšana'],
    links: [],
    images: ['/img2.jpg'],
    modelFile: null,
  },
  {
    id: 'cnc',
    titleLV: 'G-code eksperimenti · CNC frēzēšana',
    titleEN: 'G-code experiments · CNC milling',
    date: '2024 — tagad / now',
    badgeLV: 'Apgūšanas procesā',
    badgeEN: 'Learning in progress',
    green: false,
    descLV: 'Padziļināta CNC frēzēšanas un G-code apguve. Materiālu īpašības, kustību trajektorijas, instrumentu ātrumi.',
    descEN: 'In-depth study of CNC milling and G-code. Material properties, motion trajectories, tool speeds.',
    contribLV: 'Patstāvīga apguve — G-code sintakse, CAM programmēšana, kļūdu analīze.',
    contribEN: 'Self-directed learning — G-code syntax, CAM programming, error analysis.',
    learnedLV: 'Kļūda kodā tieši ietekmē fizisko rezultātu. Precizitāte ir pamatprasība.',
    learnedEN: 'A code mistake directly affects the physical result. Precision is a baseline requirement.',
    skills: ['CNC', 'G-code', 'Frēzēšana / Milling', 'CAM'],
    links: [],
    images: ['/freze.jpg'],
    modelFile: null,
  },
  {
    id: 'portfolio',
    titleLV: 'Portfolio mājaslapa',
    titleEN: 'Portfolio website',
    date: '2025 — tagad / now',
    badgeLV: 'linardsb.xyz',
    badgeEN: 'linardsb.xyz',
    green: false,
    descLV: 'Pirmā pieredze web izstrādē. Next.js bāzēta portfolio lapa — projekti, prasmes un sasniegumi vienuviet.',
    descEN: 'First experience with web development. Next.js-based portfolio site — projects, skills and achievements in one place.',
    contribLV: 'Pats izstrādāju visu — dizainu, struktūru un saturu.',
    contribEN: 'Built everything myself — design, structure and content.',
    learnedLV: 'Web izstrāde prasa strukturētu domāšanu — tāpat kā inženierprojekts.',
    learnedEN: 'Web development requires structured thinking — just like an engineering project.',
    skills: ['Next.js', 'TypeScript', 'CSS', 'GitHub'],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/Linards888/Portfolio' },
      { label: 'Live ↗', href: 'https://linardsb.xyz' },
    ],
    images: ['/PortfolioIMG.png'],
    modelFile: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Projects() {
  const { t } = useLang();

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>{t('Projekti', 'Projects')}</h1>
      <p style={{ marginBottom: 52, maxWidth: 540, color: 'var(--text-muted)', lineHeight: 1.7 }}>
        {t(
          'Katrs projekts apvieno mehāniku, elektroniku un programmēšanu — no idejas līdz darbojošamies risinājumam.',
          'Every project combines mechanics, electronics and programming — from idea to working result.'
        )}
      </p>

      <div className={styles.list}>
        {projects.map((p, i) => (
          // ↓ id here is the scroll target — e.g. id="folkrace"
          <article key={p.titleLV} id={p.id} className={styles.project}>

            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>{t(p.titleLV, p.titleEN)}</h2>
                <span className={styles.date}>{p.date}</span>
              </div>
              <span className={`${styles.badge} ${p.green ? styles.green : styles.gray}`}>
                {t(p.badgeLV, p.badgeEN)}
              </span>
            </div>

            <p className={styles.desc}>{t(p.descLV, p.descEN)}</p>

            {p.modelFile && (
              Array.isArray(p.modelFile) ? (
                <div className={styles.viewerRow}>
                  {p.modelFile.map((f) => (
                    <ModelViewer key={f} file={f} />
                  ))}
                </div>
              ) : (
                <ModelViewer file={p.modelFile} />
              )
            )}

            {p.images.length > 0 && (
              <div className={`${styles.imgs} ${p.images.length === 1 ? styles.single : ''}`}>
                {p.images.map((src) => (
                  <div key={src} className={styles.imgWrap}>
                    <Image src={src} alt={t(p.titleLV, p.titleEN)} fill className={styles.img} />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.details}>
              <div>
                <span className={styles.label}>{t('Mans ieguldījums', 'My contribution')}</span>
                <p className={styles.detailText}>{t(p.contribLV, p.contribEN)}</p>
              </div>
              <div>
                <span className={styles.label}>{t('Ko iemācījos', 'What I learned')}</span>
                <p className={styles.detailText}>{t(p.learnedLV, p.learnedEN)}</p>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.pills}>
                {p.skills.map((s) => <span key={s} className={styles.pill}>{s}</span>)}
              </div>
              {p.links.length > 0 && (
                <div className={styles.links}>
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {i < projects.length - 1 && <div className={styles.sep} />}
          </article>
        ))}
      </div>
    </div>
  );
}
