function Hero() {
  return (
    <section
      className="bg-cover bg-center h-96 flex items-center"
      style={{ backgroundImage: "url(/assets/forestation1.jpg)" }}
    >
      <div className="container mx-auto text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Support A-CPIA’s Mission</h1>
        <p className="text-lg mb-6">
          Empowering communities through education and conservation.
        </p>
        <a href="/donate" className="px-6 py-2 bg-blue-600 rounded">
          Donate Now
        </a>
      </div>
    </section>
  );
}

export default Hero;
