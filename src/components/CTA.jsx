import { motion } from 'framer-motion';

const CTA = () => (
  <section id="cta" className="py-16">
    <div className="mx-auto max-w-5xl px-6">
      <div className="section-wrapper text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">CTA</p>
          <h2 className="text-3xl font-display font-semibold text-white sm:text-4xl">
            Lista tu negocio hoy.
          </h2>
          <p className="text-lg text-white/70">Te hago una demo gratuita de 10 minutos.</p>
          <button className="rounded-full bg-neon px-10 py-3 text-base font-semibold text-midnight shadow-xl shadow-cyan-500/30 transition hover:-translate-y-0.5">
            Quiero mi demo
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CTA;
