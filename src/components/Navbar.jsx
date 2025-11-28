import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: '¿Qué hacemos?', href: '#soluciones' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Testimonios', href: '#testimonios' }
];

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-midnight/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2 text-lg font-display font-semibold tracking-tight">
          <span className="rounded-full bg-white/10 p-2 text-neon">
            <Sparkles className="h-4 w-4" />
          </span>
          Innova Digital Systems
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="tracking-wide transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/admin"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40"
          >
            Panel
          </Link>
          <a
            href="#cta"
            className="rounded-full bg-neon px-5 py-2 text-sm font-semibold text-midnight shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            Solicitar demo
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
