import Image from 'next/image';

export default function Projects() {
  return (
    <>
      <h1>My Projects 🚀</h1>
      {/* Folkrace Project Card */}
      <div className="container">
        <div className="about-image">
        <Image
          src="/folkrace.png" // place your image in public folder (e.g. /public/about.jpg)
          alt="About Me"
          width={280}
          height={280}
          style={{ borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
        />
      </div>
      <div className="card project-card">
        <div className="project-content">
          <h2>Robotu Folkrace</h2>
          <p>
            Robotu sacensību projekts Latvijā. Izstrādāju robotu konstrukciju, programmēju sensorus un vadību.
          </p>
          <a href="https://github.com/Linards888/Folkrace" className="button" target="_blank">
            GitHub Repo
          </a>
        </div>
      </div>
      </div>
      

      {/* Other projects remain unchanged */}
      <div className="card">
        <h2>AI kodēšana un mācīšana</h2>
        <p>
          Projekts, kur mācos un izstrādāju AI botu – programmēju, trenēju un testēju.
        </p>
        <a href="https://github.com/Linards888/BotMiku" className="button" target="_blank">
          GitHub Repo
        </a>
      </div>

      <div className="card">
        <h2>Portfolio websaite</h2>
        <p>
          Es izstrādāju šo mājaslapu, kas bija mana pirmā pieredze onlaina web lapas programmēšanā.
        </p>
        <a href="https://github.com/Linards888/Portfolio" className="button" target="_blank">
          GitHub Repo
        </a>
      </div>
    </>
  );
}
