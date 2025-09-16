import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-image">
        <Image
          src="/Linards1.jpg" // put your image in public folder
          alt="Linards Balodis"
          width={250}
          height={250}
          style={{ borderRadius: '50%', boxShadow: '0 6px 15px rgba(0,0,0,0.2)' }}
        />
      </div>

      <div className="home-content">
        <h1>Linards Balodis 🌟</h1>
        <p>
          Dzimis 2009.07.20, 16 gadi. Es esmu elektronikas entuziasts, kas piedalās Latvijas robotikas sacensībās. 
          Dizainēju 3D modeļus Fusion 360, mācos elektroniku un PCB dizainēšanu, kā arī pats printēju un frēzēju detaļas priekš robotiem.
        </p>
        <p>
          Šobrīd mācos CS-50 kursus EdX un PCB dizainēšanas kursus Udemy.
        </p>
      </div>
    </div>
  );
}
