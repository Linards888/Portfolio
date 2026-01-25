import Image from 'next/image';

export default function About() {
  return (
    <div className="about-container card">
      {/* Profile image */}
      <div className="about-image">
        <Image
          src="/Linards2.jpg"
          alt="About Me"
          width={260}
          height={260}
          style={{ borderRadius: '12px', objectFit: 'cover' }}
        />
      </div>

      {/* Content */}
      <div className="about-content">
        <h1>About Me 💡</h1>
        <p>
          Mani interesē elektronika, robotika un programmēšana. 
          Esmu praktisks un strādāju pie projektiem, kas apvieno dizainu un tehnoloģijas.
        </p>

        {/* Zig-zag images */}
        <div className="about-zigzag">
          <div className="zig right">
            <Image src="/img1.jpg" alt="Project 1" fill />
          </div>

          <div className="zig left">
            <Image src="/img2.jpg" alt="Project 2" fill />
          </div>

          <div className="zig right">
            <Image src="/img3.jpg" alt="Project 3" fill />
          </div>
        </div>
      </div>
    </div>
  );
}
