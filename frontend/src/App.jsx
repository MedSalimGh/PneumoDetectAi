import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <InfoSection />
      <UploadSection />
      <Footer />
    </div>
  );
}

export default App;
