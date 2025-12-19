import React from 'react';

const Footer = () => {
    return (
        <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
            <div className="container">
                <p style={{ color: '#8b949e' }}>&copy; 2024 PneumoDetect. Built for Medical AI Research.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#484f58' }}>
                    Disclaimer: This tool is for educational/assistive purposes only and does not replace professional medical diagnosis.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
