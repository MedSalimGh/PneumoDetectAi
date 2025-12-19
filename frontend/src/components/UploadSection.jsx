import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReportSection from './ReportSection';

const UploadSection = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult(null);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {

            // Use environment variable for API URL, fallback to localhost for dev
            let API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
            // Remove trailing slash if present to avoid double slashes
            API_URL = API_URL.replace(/\/+$/, '');

            const response = await axios.post(`${API_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze image. Please check if backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    return (
        <section id="upload" style={{ padding: '80px 0', minHeight: '600px', background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.05) 0%, transparent 70%)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'inline-block', marginBottom: '15px', color: 'var(--accent-color)', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '600', border: '1px solid var(--accent-color)', padding: '5px 10px', borderRadius: '4px' }}
                    >
                        AI DIAGNOSTIC TOOL
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ fontSize: '3rem', fontWeight: '700' }}
                    >
                        Upload Chest X-Ray
                    </motion.h2>
                </div>

                <div style={{ maxWidth: '650px', margin: '0 auto' }}>
                    <div className="glass-panel" style={{
                        padding: '40px',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        boxShadow: '0 0 50px rgba(56, 189, 248, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Scanning Line Animation */}
                        <motion.div
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
                                boxShadow: '0 0 10px var(--accent-color)',
                                zIndex: 10
                            }}
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />

                        {/* Decorative Corner Lines */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '2px solid var(--accent-color)', borderLeft: '2px solid var(--accent-color)' }}></div>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '2px solid var(--accent-color)', borderRight: '2px solid var(--accent-color)' }}></div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '2px solid var(--accent-color)', borderLeft: '2px solid var(--accent-color)' }}></div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '2px solid var(--accent-color)', borderRight: '2px solid var(--accent-color)' }}></div>

                        {!preview ? (
                            <div
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed rgba(56, 189, 248, 0.3)',
                                    borderRadius: '8px',
                                    padding: '80px 20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: isDragActive ? 'rgba(56, 189, 248, 0.1)' : 'rgba(13, 17, 23, 0.3)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <input {...getInputProps()} />
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                    <Upload size={48} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
                                </motion.div>
                                <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                                    {isDragActive ? "Drop text X-ray here..." : "Drag & drop X-ray image here"}
                                </p>
                                <p style={{ color: '#8b949e', marginTop: '10px' }}>or click to select file</p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                                    />
                                    {!loading && !result && (
                                        <button
                                            onClick={reset}
                                            style={{
                                                position: 'absolute', top: -10, right: -10,
                                                background: 'var(--error-color)', color: '#fff',
                                                border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {!result && !loading && (
                                    <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Patient ID / Reference No.</label>
                                            <input
                                                type="text"
                                                placeholder="EX: PT-8492"
                                                style={{
                                                    width: '100%', padding: '10px', borderRadius: '6px',
                                                    border: '1px solid var(--border-color)',
                                                    background: 'rgba(13, 17, 23, 0.5)', color: '#fff'
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Patient Birth Date</label>
                                            <input
                                                type="date"
                                                style={{
                                                    width: '100%', padding: '10px', borderRadius: '6px',
                                                    border: '1px solid var(--border-color)',
                                                    background: 'rgba(13, 17, 23, 0.5)', color: '#fff'
                                                }}
                                            />
                                        </div>

                                        <div style={{
                                            padding: '15px',
                                            marginBottom: '20px',
                                            background: 'rgba(240, 180, 41, 0.1)',
                                            border: '1px solid rgba(240, 180, 41, 0.3)',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            color: '#eac54f'
                                        }}>
                                            <strong style={{ display: 'block', marginBottom: '5px' }}>⚠️ MEdICAL LIABILITY DISCLAIMER</strong>
                                            This AI tool is for investigational research only. It is NOT a diagnostic device.
                                            All results must be verified by a certified radiologist.
                                            By proceeding, you acknowledge this tool does not replace professional medical advice.
                                        </div>

                                        <div style={{ textAlign: 'center' }}>
                                            <button onClick={handleUpload} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px', width: '100%' }}>
                                                Analyze Image
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {loading && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                    <Loader size={48} color="var(--accent-color)" />
                                </motion.div>
                                <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>Analyzing Tissue Structure...</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        marginTop: '30px',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        background: result.prediction === 'Pneumonia' ? 'rgba(248, 81, 73, 0.1)' : 'rgba(46, 160, 67, 0.1)',
                                        border: `1px solid ${result.prediction === 'Pneumonia' ? 'var(--error-color)' : 'var(--success-color)'}`
                                    }}
                                >
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        {result.prediction === 'Pneumonia' ? <AlertCircle color="var(--error-color)" /> : <CheckCircle color="var(--success-color)" />}
                                        Result: <span style={{ color: result.prediction === 'Pneumonia' ? 'var(--error-color)' : 'var(--success-color)' }}>{result.prediction}</span>
                                    </h3>
                                    <p style={{ fontSize: '1.1rem' }}>
                                        Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
                                    </p>
                                    <button onClick={reset} className="btn" style={{ marginTop: '20px', background: 'var(--secondary-bg)', color: '#fff', marginRight: '10px' }}>
                                        Analyze Another
                                    </button>
                                    <button
                                        onClick={() => setShowReport(true)}
                                        className="btn btn-primary"
                                        style={{ marginTop: '20px' }}
                                    >
                                        View Full Report
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(218, 54, 51, 0.1)', color: 'var(--error-color)', borderRadius: '6px' }}>
                                {error}
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showReport && result && (
                    <ReportSection result={result} onClose={() => setShowReport(false)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default UploadSection;
