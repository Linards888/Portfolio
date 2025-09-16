import Image from 'next/image';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-image">
        <Image
          src="/Linards2.jpg" // place your image in public folder (e.g. /public/about.jpg)
          alt="About Me"
          width={280}
          height={280}
          style={{ borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
        />
      </div>

      <div className="about-content">
        <h1>About Me 💡</h1>
        <p>
          Mani interesē elektronika, robotika un programmēšana. 
          Esmu praktisks un strādāju pie projektiem, kas apvieno dizainu un tehnoloģijas.
        </p>
        <p>
          Jā, vēlos pievienot arī attēlus vēlāk.
        </p>
      </div>
    </div>
  );
}
