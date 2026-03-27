import Image from "next/image";

const projects = [
  {
    title: "Portfolio websaite",
    description:
      "Mana pirmā pieredze web izstrādē. Šajā projektā iemācījos pamatus par frontend izstrādi.",
    image: "/PortfolioIMG.png",
    link: "https://github.com/Linards888/Portfolio",
  },
  {
    title: "Robotu Folkrace",
    description:
      "Robotu sacensību projekts Latvijā, kurā izstrādāju robota 3D konstrukciju, veidoju elektronikas shēmas un programmēju vadības sistēmu. Integrēju sensorus, izstrādāju kustības loģiku un optimizēju robota darbību sacensību apstākļiem.",
    image: "/folkrace.png",
    link: "https://github.com/Linards888/Folkrace",
  },
  {
    title: "Antweight 454g",
    description:
      "Esmu izstrādājis dažādus antweight robotus kas ir piedalījušies LRČ (Latvijas robotikas čempionātos) un Robots kas parādīts bildē piedalijās RoboChallenge 2025 gadā un tika top 16 Eiropā",
    image: "/img1.jpg",
    link: "https://github.com/",
  },
  {
    title: "DIY SIM racing",
    description:
      "Mēs izveidojām braukšanas simulatoru, veidojot 3D detaļas, integrējot elektroniku un konfigurējot vadības sistēmu (stūre, pedāļi u.c.). Piedalījos sistēmas uzbūvē un optimizācijā, lai nodrošinātu reālistisku un precīzu vadību. Pašlaik strādājam pie kameras integrācijas robotu folkreisa projektā un tās savienošanas ar SIM setup, lai varētu attālināti vadīt robotu un skatīt braucienu VR brillēs.",
    image: "/img2.jpg",
    link: "https://github.com/",
  },
  {
    title: "G_code expermenti",
    description:
      "Šajā momentā, kā paildus projektu, es apgūstu prfesionālu frēzēšanu. Es cenšos izprast kā uztaisa profesionālu CNC programmu priekš dažādiem mērķiem un vajadzībām.",
    image: "/folkrace.png",
    link: "https://github.com/",
  },
  {
    title: "Robot sensors test bench",
    description:
      "Testēju dažādus sensorus (IR, ultraskaņa) un kalibrēju tos robotiem.",
    image: "/folkrace.png",
    link: "https://github.com/",
  },
  {
    title: "AI kodēšana un mācīšana",
    description:
      "Projekts, kur mācos un izstrādāju AI botu – programmēju, trenēju un testēju. Progress lēns, bet notiek 😅",
    image: "/folkrace.png",
    link: "https://github.com/Linards888/BotMiku",
  },
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
            {}
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

            {}
            <div className="card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <a
                href={project.link}
                className="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}