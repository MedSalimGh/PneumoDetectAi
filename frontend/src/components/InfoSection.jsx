import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Thermometer, Wind } from 'lucide-react';
import lung3d from '../assets/lung_3d.png';

const InfoSection = () => {
    return (
        <section style={{ padding: '100px 0', background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative background elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'var(--accent-glow)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(46, 160, 67, 0.2)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'inline-block', padding: '5px 15px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '20px', color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '20px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            MEDICAL INSIGHTS
                        </div>
                        <h2 style={{ fontSize: '3rem', marginBottom: '30px', lineHeight: 1.2 }}>
                            Understanding <br />
                            <span style={{ color: 'var(--accent-color)' }}>Pneumonia</span>
                        </h2>
                        <p style={{ marginBottom: '20px', color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Pneumonia is an inflammatory condition of the lung affecting primarily the small air sacs known as alveoli.
                            Usually caused by infection with viruses or bacteria, it requires timely diagnosis for effective treatment.
                        </p>

                        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <InfoCard icon={<Thermometer />} title="High Fever" desc="Sudden spikes in body temperature (>38°C)." />
                            <InfoCard icon={<Wind />} title="Shortness of Breath" desc="Difficulty breathing even while resting." />
                            <InfoCard icon={<Activity />} title="Chest Pain" desc="Sharp pain that worsens when coughing." />
                            <InfoCard icon={<Shield />} title="Prevention" desc="Vaccination and good hygiene are key." />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel"
                        style={{
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(145deg, rgba(21, 30, 46, 0.8), rgba(11, 17, 32, 0.9))',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                            <img src={lung3d} alt="3D Lung Model" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.3))' }} />

                            {/* Floating AI Nodes - Decorative */}
                            <div style={{ position: 'absolute', top: '20%', right: '10%', padding: '10px', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', border: '1px solid var(--accent-color)', fontSize: '0.8rem' }}>
                                <div style={{ color: 'var(--accent-color)' }}>AI ANALYSIS</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Scanning Tissue Density...</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const InfoCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ scale: 1.05, x: 10, background: 'rgba(56, 189, 248, 0.05)' }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', padding: '10px', borderRadius: '8px', cursor: 'default' }}
    >
        <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', color: 'var(--accent-color)' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{title}</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{desc}</p>
        </div>
    </motion.div>
);

export default InfoSection;
