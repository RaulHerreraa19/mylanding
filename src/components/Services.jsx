import { motion } from 'framer-motion';
import { Globe2, MessageSquare, ServerCog, Workflow } from 'lucide-react';

const services = [
  {
    icon: Globe2,
    title: 'Landing Pages y Sitios Web',
    price: 'Desde $1,200 MXN',
    description: 'Incluye diseño, formulario y hosting.',
    accent: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    icon: MessageSquare,
    title: 'Chatbots con Inteligencia Artificial',
    price: 'Desde $900 MXN / mes',
    description: 'Responde clientes 24/7, toma pedidos y genera contactos.',
    accent: 'from-purple-500/20 via-indigo-500/10 to-transparent'
  },
  {
    icon: ServerCog,
    title: 'Sistemas Administrativos',
    price: 'Desde $3,000 MXN o $600 MXN/mes',
    description: 'Control de ventas, inventarios, repartidores, etc.',
    accent: 'from-sky-500/20 via-teal-500/10 to-transparent'
  },
  {
    icon: Workflow,
    title: 'Automatización con Python',
    price: 'Desde $1,000 MXN',
    description: 'Reportes automáticos, bots, procesos diarios.',
    accent: 'from-pink-500/20 via-fuchsia-500/10 to-transparent'
  }
];

const Services = () => (
  <section id="servicios" className="py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neon">Servicios</p>
          <h2 className="mt-4 text-3xl font-display font-semibold text-white sm:text-4xl">
            Diseñados para acelerar tu operación.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-500/10"
            >
              <div className={`pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${service.accent}`} />
              <div className="relative space-y-4">
                <service.icon className="h-10 w-10 text-neon" />
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="text-lg text-neon">{service.price}</p>
                <p className="text-white/70">{service.description}</p>
                <button className="rounded-full border border-white/15 px-6 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40">
                  Solicitar ahora
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Services;
