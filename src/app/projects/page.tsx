import Image from "next/image";

const projects = [
  {
    title: "Robotu Folkrace",
    description:
      "Robotu sacensību projekts Latvijā. Izstrādāju robotu konstrukciju, programmēju sensorus un vadību.",
    image: "/folkrace.png",
    link: "https://github.com/Linards888/Folkrace",
  },
  {
    title: "AI kodēšana un mācīšana",
    description:
      "Projekts, kur mācos un izstrādāju AI botu – programmēju, trenēju un testēju. Progress lēns, bet notiek 😅",
    image: "/folkrace.png",
    link: "https://github.com/Linards888/BotMiku",
  },
  {
    title: "Portfolio websaite",
    description:
      "Mana pirmā pieredze web izstrādē. Šajā projektā iemācījos pamatus par frontend izstrādi.",
    image: "/folkrace.png",
    link: "https://github.com/Linards888/Portfolio",
  },

  {
    title: "ESP32 Bluetooth projekts",
    description:
      "Bluetooth komunikācija ar ESP32, UART testēšana un datu pārraide.",
    image: "/folkrace.png",
    link: "https://github.com/",
  },
  {
    title: "CNC G-code eksperimenti",
    description:
      "Darbs ar .nc failiem, G-code ģenerēšana un testēšana no Fusion 360.",
    image: "/folkrace.png",
    link: "https://github.com/",
  },
  {
    title: "PCB dizains",
    description:
      "Shēmu zīmēšana un PCB layout veidošana ar pirmajiem prototipiem.",
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
];

export default function Projects() {
  return (
    <div className="projects">
      <h1>My Projects 🚀</h1>

      {projects.map((project, index) => (
        <div className="project-row" key={index}>
          {/* IMAGE BLOCK */}
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

          {/* TEXT BLOCK */}
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
      ))}
    </div>
  );
}