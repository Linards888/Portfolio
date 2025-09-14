export default function Contact() {
  return (
    <>
      <h1>Contact Me ✨</h1>
      <p>Telefons: 22447414</p>
      <p>E-pasts: <a href="mailto:Linardsbalodis2009@gmail.com">Linardsbalodis2009@gmail.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/linards-balodis-689b912bb/" target="_blank">Linards Balodis</a></p>

      <form action="mailto:Linardsbalodis2009@gmail.com" method="POST" encType="text/plain">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows={5} placeholder="Your Message" required></textarea>
        <button type="submit" className="button">Send Message</button>
      </form>
    </>
  );
}
