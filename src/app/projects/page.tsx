import Image from "next/image";

const projects = [
  {
    title: "Portfolio websaite",
    description:
      "Mana pirmā pieredze web izstrādē. Šajā projektā iemācījos pamatus par frontend izstrādi.",
    image: "/PortfolioIMG.png",
    buttons: [
      {
        text: "GitHub",
        link: "https://github.com/Linards888/Portfolio",
      },
      {
        text: "Live Demo",
        link: "https://linardsb.xyz",
      },
    ],
  },
  {
    title: "Robotu Folkrace",
    description:
      "Robotu sacensību projekts Latvijā, kurā izstrādāju robota 3D konstrukciju, veidoju elektronikas shēmas un programmēju vadības sistēmu. Integrēju sensorus, izstrādāju kustības loģiku un optimizēju robota darbību sacensību apstākļiem.",
    image: "/folkrace.png",
    buttons: [
      {
        text: "GitHub",
        link: "https://github.com/Linards888/Folkrace",
      },
      {
        text: '"Pirmais Folkrace"',
        link: "https://a360.co/3O1SIhj",
      },
      {
        text: '"Brushless Folk"',
        link: "https://a360.co/4bVA5Ug",
      },
      {
        text: '"FolkNEW"',
        link: "https://a360.co/47p1zAb",
      },
    ],
  },
  {
    title: "Antweight 454g",
    description:
      "Esmu izstrādājis dažādus antweight robotus kas ir piedalījušies LRČ (Latvijas robotikas čempionātos) un Robots kas parādīts bildē piedalijās RoboChallenge 2025 gadā un tika top 16 Eiropā",
    image: "/img1.jpg",
    buttons: [
      {
        text: '"Velvenis"',
        link: "https://a360.co/4j2iNXR",
      },
    ],
  },
  {
    title: "DIY SIM racing",
    description:
      "Mēs izveidojām braukšanas simulatoru, veidojot 3D detaļas, integrējot elektroniku un konfigurējot vadības sistēmu (stūre, pedāļi u.c.). Piedalījos sistēmas uzbūvē un optimizācijā, lai nodrošinātu reālistisku un precīzu vadību. Pašlaik strādājam pie kameras integrācijas robotu folkreisa projektā un tās savienošanas ar SIM setup, lai varētu attālināti vadīt robotu un skatīt braucienu VR brillēs.",
    image: "/img2.jpg",
    buttons: [
      {
        text: "Github Repo",
        link: "https://github.com/",
      }
    ],
  },
  {
    title: "G-code eksperimenti",
    description:
      "Šajā momentā, kā paildus projektu, es apgūstu prfesionālu frēzēšanu. Es cenšos izprast kā uztaisa profesionālu CNC programmu priekš dažādiem mērķiem un vajadzībām.",
    image: "/freze.jpg",
    buttons: [
    ],
  }
];

export default function Projects() {
  return (
    <div className="projects">
      <h1>My Projects 🚀</h1>

      {projects.map((project, index) => {
        const isReverse = index % 2 === 1;

        return (
          <div
            className={`project-row ${isReverse ? "reverse" : ""}`}
            key={index}
          >
            {/* IMAGE */}
            {project.image && (
              <div className="image-box">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                />
              </div>
            )}

            {/* TEXT */}
            <div className="card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="button-group">
                {project.buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.link}
                    className="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {btn.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}