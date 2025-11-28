import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import WhatWeDo from '../components/WhatWeDo.jsx';
import Benefits from '../components/Benefits.jsx';
import Services from '../components/Services.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';

const Landing = () => (
  <div className="min-h-screen bg-midnight text-white">
    <Navbar />
    <main className="space-y-4 lg:space-y-6">
      <Hero />
      <WhatWeDo />
      <Benefits />
      <Services />
      <Testimonials />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Landing;
