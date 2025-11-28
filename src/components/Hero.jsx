import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-32">
      <div className="absolute inset-0 -z-10 blur-3xl">
        <div className="mx-auto h-72 w-72 rounded-full bg-gradient-to-r from-neon/40 via-cyan-400/30 to-orchid/40 opacity-60" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="space-y-8 text-center lg:w-1/2 lg:text-left"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
            Startup SaaS · México
          </p>
          <h1 className="text-4xl font-display font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Tecnología real para negocios reales.
          </h1>
          <p className="text-lg text-white/70 sm:text-xl">
            Soluciones web, automatización y chatbots que hacen tu negocio más rápido, eficiente y rentable.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#cta"
              className="rounded-full bg-neon px-8 py-3 text-center text-base font-semibold text-midnight shadow-xl shadow-cyan-500/40 transition hover:-translate-y-0.5"
            >
              Solicitar demo
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-white/15 px-8 py-3 text-center text-base font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/40"
            >
              Ver precios
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur"
        >
          <div className="absolute -left-3 top-10 hidden h-20 w-20 rounded-2xl border border-cyan-400/30 lg:block" />
          <div className="absolute -right-6 -top-6 hidden h-16 w-16 rounded-full border border-purple-400/30 lg:block" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Status</p>
                <p className="text-lg font-semibold">Proyectos activos</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm text-emerald-300">8 en curso</span>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              {[{ label: 'Implementaciones', value: '120+' }, { label: 'Automatizaciones', value: '60+' }, { label: 'Chatbots', value: '45+' }, { label: 'Satisfacción', value: '4.9/5' }].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-display font-semibold">{metric.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
