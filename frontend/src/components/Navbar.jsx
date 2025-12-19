import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = () => {
    return (
        <nav style={{
            padding: '20px 0',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--secondary-bg)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-color)' }}>
                    <Activity size={32} color="var(--accent-color)" />
                    <span>Pneumo<span style={{ color: 'var(--accent-color)' }}>Detect</span><span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '5px', fontWeight: '400' }}>AI</span></span>
                </div>
                <div>
                    <a href="#upload" className="btn btn-primary">Try Method</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
