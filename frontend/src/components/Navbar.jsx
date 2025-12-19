import React from 'react';

const Navbar = () => {
    return (
        <nav style={{
            padding: '20px 0',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--secondary-bg)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-color)' }}>
                    <img
                        src="/ai-logo.png"
                        alt="PneumoDetectAi Logo"
                        style={{
                            width: '40px',
                            height: '40px',
                            filter: 'drop-shadow(0 0 8px var(--accent-color))'
                        }}
                    />
                    <span>Pneumo<span style={{ color: 'var(--accent-color)' }}>Detect</span><span style={{ color: 'var(--accent-color)' }}>Ai</span></span>
                </div>
                <div>
                    <a href="#upload" className="btn btn-primary">Try Method</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
