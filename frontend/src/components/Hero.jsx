import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

const Hero = () => {
    // Feature data
    const features = [
        { icon: <Zap size={32} color="#f0883e" />, title: "Instant Analysis", desc: "Get results in seconds" },
        { icon: <ShieldCheck size={32} color="#2ea043" />, title: "High Accuracy", desc: "98% Precision Rate" },
        { icon: <Activity size={32} color="#38bdf8" />, title: "Easy to Use", desc: "Drag & Drop Interface" },
        { icon: <Zap size={32} color="#f0883e" />, title: " Real-time", desc: "Live Inference" }, // Duplicate for length
        { icon: <ShieldCheck size={32} color="#2ea043" />, title: "Secure", desc: "Local Processing" },
    ];

    return (
        <section style={{ padding: '100px 0', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            marginBottom: '30px',
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)'
                        }}
                    >
                        ✨ NEXT-GEN MEDICAL AI
                    </motion.div>

                    <h1 style={{ fontSize: '5rem', fontWeight: '800', marginBottom: '25px', letterSpacing: '-2px', lineHeight: 1.1 }}>
                        Advanced AI for <br />
                        <span style={{
                            background: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.4))',
                            animation: 'gradientMove 3s linear infinite'
                        }}>
                            Pneumonia Detection
                        </span>
                    </h1>

                    <p style={{ fontSize: '1.3rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 60px', lineHeight: 1.7 }}>
                        Leveraging <span style={{ color: '#fff' }}>state-of-the-art Deep Learning</span> models to assist medical professionals in rapid chest X-ray analysis.
                        Precision, speed, and reliability in one powerful tool.
                    </p>

                    {/* Infinite Marquee Carousel */}
                    <div style={{
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}>
                        <motion.div
                            style={{ display: 'flex', gap: '40px', padding: '40px 0' }}
                            animate={{ x: [0, -1000] }}
                            transition={{
                                x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }
                            }}
                        >
                            {[...features, ...features, ...features].map((f, i) => (
                                <NeonCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
                            ))}
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Background animated particles */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: -1 }}>
                <div style={{
                    position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
                    filter: 'blur(50px)', animation: 'pulse 5s infinite ease-in-out'
                }}></div>
                <div style={{
                    position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)', animation: 'pulse 7s infinite ease-in-out reverse'
                }}></div>
            </div>

            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes neonBorder {
                    0%, 100% { border-color: rgba(56, 189, 248, 0.3); box-shadow: 0 0 10px rgba(56,189,248,0.1); }
                    50% { border-color: rgba(56, 189, 248, 1); box-shadow: 0 0 20px rgba(56,189,248,0.4); }
                }
            `}</style>
        </section>
    );
};

const NeonCard = ({ icon, title, desc }) => (
    <div
        className="glass-panel"
        style={{
            padding: '30px',
            minWidth: '280px',
            textAlign: 'left',
            background: 'linear-gradient(135deg, rgba(21, 30, 46, 0.9), rgba(15, 23, 42, 0.9))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            position: 'relative',
            animation: 'neonBorder 3s infinite alternate'
        }}
    >
        <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', width: 'fit-content' }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.3rem', color: '#fff' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{desc}</p>
    </div>
);

export default Hero;
