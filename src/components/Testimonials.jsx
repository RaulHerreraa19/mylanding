import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: '“Ahora controlo mis ventas sin perder tiempo.”',
    author: '— Tortillería Vista Hermosa'
  },
  {
    quote: '“El chatbot nos ahorra 3 horas diarias.”',
    author: '— Gimnasio Iron Club'
  }
];

const Testimonials = () => (
  <section id="testimonios" className="py-16">
    <div className="mx-auto max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neon">Testimonios</p>
        <h2 className="mt-4 text-3xl font-display font-semibold text-white sm:text-4xl">
          Historias de crecimiento real.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: idx * 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <Quote className="h-10 w-10 text-neon" />
            <p className="mt-4 text-xl text-white/90">{testimonial.quote}</p>
            <p className="mt-2 text-sm text-white/60">{testimonial.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
