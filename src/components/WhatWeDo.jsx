import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, MessageSquare, Shuffle, Smartphone } from 'lucide-react';

const services = [
  { icon: Layout, label: 'Páginas web profesionales' },
  { icon: Cpu, label: 'Sistemas administrativos' },
  { icon: MessageSquare, label: 'Chatbots con IA' },
  { icon: Code2, label: 'Automatización de tareas con Python' },
  { icon: Shuffle, label: 'Formularios inteligentes' },
  { icon: Smartphone, label: 'Apps móviles (bajo pedido)' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.05 } })
};

const WhatWeDo = () => (
  <section id="soluciones" className="py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="section-wrapper">
        <div className="section-gradient" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neon">¿Qué hacemos?</p>
          <h2 className="text-3xl font-display font-semibold text-white sm:text-4xl">
            Transformamos tareas manuales en procesos automáticos.
          </h2>
          <p className="text-lg text-white/70">
            Diseñamos soluciones digitales escalables para acelerar la operación de tu negocio.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              variants={cardVariants}
              custom={index}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <service.icon className="h-10 w-10 text-neon" />
              <p className="text-lg font-medium text-white/90">{service.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhatWeDo;
