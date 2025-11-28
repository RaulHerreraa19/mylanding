const Footer = () => (
  <footer className="mt-16 border-t border-white/5 bg-midnight/60 py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-white/60 sm:flex-row">
      <p>© {new Date().getFullYear()} Innova Digital Systems. Todos los derechos reservados.</p>
      <div className="flex gap-4">
        <a href="#servicios" className="hover:text-white">Servicios</a>
        <a href="#testimonios" className="hover:text-white">Testimonios</a>
        <a href="#cta" className="hover:text-white">Contacto</a>
        <a href="/admin" className="hover:text-white">Panel</a>
      </div>
    </div>
  </footer>
);

export default Footer;
