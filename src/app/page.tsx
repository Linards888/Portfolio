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
          Man pašlaik ir 16 gadi un mācos 10.klasē. Esmu elektronikas entuziasts un piedalos Latvijas robotikas sacensībās. 
          Dizainēju 3D modeļus Fusion 360, mācos elektroniku un PCB dizainēšanu, kā arī pats printēju un frēzēju robotu detaļas.
        </p>
        <p>
          Šobrīd skatos CS-50 kursus un mācos PCB dizainēšanu.
        </p>
      </div>
    </div>
  );
}
