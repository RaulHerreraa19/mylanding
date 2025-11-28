import { motion } from 'framer-motion';
import { CalendarCheck2, Coins, Headphones, MessageCircle, Rocket, Zap } from 'lucide-react';

const benefits = [
  { icon: Zap, label: 'Entrega rápida (2 a 7 días)' },
  { icon: Coins, label: 'Costo accesible' },
  { icon: MessageCircle, label: 'Integración con WhatsApp' },
  { icon: CalendarCheck2, label: 'Sin contratos largos' },
  { icon: Headphones, label: 'Soporte personalizado' },
  { icon: Rocket, label: 'Ideal para negocios pequeños y medianos' }
];

const Benefits = () => (
  <section id="beneficios" className="py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="section-wrapper bg-white/3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-neon">Beneficios</p>
          <h2 className="text-3xl font-display font-semibold text-white sm:text-4xl">
            ¿Por qué elegir Innova Digital Systems?
          </h2>
          <p className="text-lg text-white/70">
            Nos enfocamos en entregar resultados visibles en cuestión de días y acompañarte en todo el proceso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <div key={benefit.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <benefit.icon className="h-10 w-10 text-neon" />
              <p className="text-lg text-white/90">{benefit.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Benefits;
