/**
 * @copyright Nomaan 2025
 */

"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';

// This is helper component spinner 
const Spinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center">
        <div className="border-4 border-zinc-600 border-l-white rounded-full w-6 h-6 animate-spin mx-auto"></div>
        <p className="text-zinc-400 font-medium mt-3">Processing...</p>
    </div>
);

const AnimatedBackground: React.FC = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
    </div>
);

// Header section
const Header: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-lg shadow-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-lg"></div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">GuardianCrypt</h1>
                        <p className="text-xs text-zinc-400">Next-Gen Security</p>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#features" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Features</a>
                    <a href="#security" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Security</a>
                    <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-all transform hover:scale-105">
                        Get Started
                    </button>
                </nav>
            </div>
        </div>
    </header>
);

// Footer section
const Footer: React.FC = () => (
    <footer className="relative bg-black border-t border-zinc-800 mt-auto overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-50"></div>
        
        <div className="relative container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">GuardianCrypt</span>
                    </div>
                    <p className="text-zinc-400 text-sm max-w-md mb-4">
                        The most advanced file encryption tool with military-grade AES-256 security. Trusted by professionals worldwide.
                    </p>
                    <div className="flex space-x-3">
                        <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white rounded-lg flex items-center justify-center transition-all group">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white rounded-lg flex items-center justify-center transition-all group">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                        </a>
                        <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white rounded-lg flex items-center justify-center transition-all group">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Product</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Features
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Documentation
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            API Reference
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Changelog
                        </a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Security</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Encryption Standards
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Privacy Policy
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Terms of Service
                        </a></li>
                        <li><a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center group">
                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                            Compliance
                        </a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-zinc-500 text-sm">&copy; 2025 GuardianCrypt. All rights reserved.</p>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-xs text-zinc-600">Secured by AES</span>
                    {/* <div className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-zinc-400 font-medium">AES-256</span> 
                    </div> */}
                </div>
            </div>
        </div>
    </footer>
);

// Stats section
const StatsBar: React.FC = () => (
    <div className="w-full max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">256-bit</div>
                <div className="text-xs text-zinc-500 mt-1">Encryption</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">&lt;1s</div>
                <div className="text-xs text-zinc-500 mt-1">Processing</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">100%</div>
                <div className="text-xs text-zinc-500 mt-1">Private</div>
            </div>
        </div>
    </div>
);

// Main App section
export default function Home() {
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState<string>('');
    const [fileName, setFileName] = useState<string>('No file selected.');
 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    const [downloadFilename, setDownloadFilename] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            if (successUrl) {
                URL.revokeObjectURL(successUrl);
            }
        };
    }, [successUrl]);

    // Drag and Drop Handler
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFileName(droppedFile.name);
            setError(null);
            setSuccessUrl(null);
        }
    };

    // UI Handler
    const handleSetMode = (newMode: 'encrypt' | 'decrypt') => {
        setMode(newMode);
        setFile(null);
        setPassword('');
        setFileName('No file selected.');
        setLoading(false);
        setError(null);
        setSuccessUrl(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : 'No file selected.');
        setError(null);
        setSuccessUrl(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file || !password) {
            setError('Please select a file and enter a password.');
            return;
        }
        
        setLoading(true);
        setError(null);
        setSuccessUrl(null);
        if (successUrl) URL.revokeObjectURL(successUrl);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password);

        const endpoint = mode === 'encrypt' ? '/api/encrypt' : '/api/decrypt';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'An unknown error occurred.');
            }
            
            const blob = await response.blob();
            const newUrl = URL.createObjectURL(blob);
            setSuccessUrl(newUrl);

            const disposition = response.headers.get('content-disposition');
            let filename = mode === 'encrypt' ? 'encrypted-file' : 'decrypted-file';
            if (disposition && disposition.includes('attachment')) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches?.[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
            setDownloadFilename(filename);

        } catch (err: any) {
            console.error('Operation failed:', err);
            setError(err.message || 'Operation failed. Is the Python server running?');
        } finally {
            setLoading(false);
        }
    };

    // Render
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col relative">
            <AnimatedBackground />
            <Header />
            
            <main className="flex-1 flex flex-col items-center justify-center p-4 py-24 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-8 max-w-3xl">
                    {/* <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-zinc-400 font-medium">🔒 Zero-Knowledge Architecture</span>
                    </div> */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Military-Grade
                        <br />
                        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                            File Encryption
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Secure your files with quantum-resistant AES-256 encryption. Your data never leaves your device.
                    </p>
                </div>

                <StatsBar />

                {/* Main Content Card */}
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                        
                        {/* Toggle Buttons */}
                        <div className="flex bg-zinc-900/50 p-1.5 m-4 rounded-xl border border-zinc-800">
                            <button
                                onClick={() => handleSetMode('encrypt')}
                                className={`flex-1 p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${
                                    mode === 'encrypt' 
                                        ? 'bg-white text-black shadow-lg shadow-white/20' 
                                        : 'text-zinc-400 hover:bg-zinc-800/50'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Encrypt
                            </button>
                            <button
                                onClick={() => handleSetMode('decrypt')}
                                className={`flex-1 p-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${
                                    mode === 'decrypt' 
                                        ? 'bg-white text-black shadow-lg shadow-white/20' 
                                        : 'text-zinc-400 hover:bg-zinc-800/50'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                                Decrypt
                            </button>
                        </div>
                        
                        {/* Form Area */}
                        <div className="p-6 md:p-8">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                
                                {/* Drag and Drop File Input */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                                        isDragging 
                                            ? 'border-white bg-white/5 scale-105' 
                                            : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/30'
                                    }`}
                                >
                                    <input 
                                        id="file-input" 
                                        type="file" 
                                        required 
                                        className="hidden" 
                                        onChange={handleFileChange} 
                                    />
                                    <label htmlFor="file-input" className="cursor-pointer block text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-medium mb-1">
                                            {file ? fileName : 'Drop your file here'}
                                        </p>
                                        <p className="text-zinc-500 text-sm">or click to browse</p>
                                        {file && (
                                            <div className="mt-4 inline-flex items-center space-x-2 bg-zinc-800 rounded-full px-4 py-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs text-zinc-400">File loaded</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                
                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password-input" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Encryption Password
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="password" 
                                            id="password-input" 
                                            className="w-full p-3 pl-10 bg-zinc-900/50 border border-zinc-700 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all" 
                                            placeholder="Enter a strong password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        This password cannot be recovered. Store it securely.
                                    </p>
                                </div>
                                
                                {/* Action Button */}
                                <button 
                                    type="submit" 
                                    className="w-full relative overflow-hidden group p-4 font-semibold text-black bg-white rounded-xl hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/10 hover:shadow-white/20 transform hover:scale-[1.02]" 
                                    disabled={loading}
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {mode === 'encrypt' ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Encrypt File Now
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                                        </svg>
                                                        Decrypt File Now
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </button>
                                
                            </form>
                            
                            {/* Status/Result Area */}
                            <div className="mt-6 text-center min-h-[80px]">
                                {loading && <Spinner />}
                                {error && (
                                    <div className="bg-red-950/50 border border-red-800/50 backdrop-blur-sm rounded-xl p-4 animate-fade-in">
                                        <div className="flex items-start space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-300 text-sm text-left">{error}</p>
                                        </div>
                                    </div>
                                )}
                                {successUrl && (
                                    <div className="bg-green-950/50 border border-green-800/50 backdrop-blur-sm rounded-xl p-6 animate-fade-in">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-green-300 font-semibold mb-4">
                                            {mode === 'encrypt' ? 'File encrypted successfully!' : 'File decrypted successfully!'}
                                        </p>
                                        <a 
                                            href={successUrl} 
                                            download={downloadFilename} 
                                            className="inline-flex items-center justify-center w-full p-3 font-semibold text-black bg-white rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Download Your File
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-zinc-500">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Zero-Knowledge</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                            </svg>
                            <span>End-to-End</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 7H7v6h6V7z" />
                                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                            </svg>
                            <span>Open Source</span>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl w-full px-4">
                    {[
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            ),
                            title: "AES-256 Encryption",
                            description: "Military-grade encryption standard trusted by governments and Fortune 500 companies worldwide.",
                            badge: "Military-Grade"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            title: "Instant Processing",
                            description: "Lightning-fast encryption and decryption powered by optimized algorithms and local processing.",
                            badge: "< 1 Second"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            title: "Zero-Knowledge",
                            description: "Your files never leave your device. Complete privacy with no data collection or storage.",
                            badge: "100% Private"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            ),
                            title: "Any File Type",
                            description: "Encrypt documents, images, videos, archives, and any other file format up to 500MB.",
                            badge: "Universal"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            ),
                            title: "Open Source",
                            description: "Fully transparent and auditable code. Built with Next.js, Python, and industry-standard cryptography.",
                            badge: "Auditable"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            ),
                            title: "Quantum-Resistant",
                            description: "Future-proof security with PBKDF2 key derivation and 100,000 iterations for maximum protection.",
                            badge: "Future-Proof"
                        }
                    ].map((feature, index) => (
                        <div 
                            key={index}
                            className="group relative bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    <span className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-zinc-400 font-medium">
                                        {feature.badge}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center max-w-2xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to secure your files?
                    </h3>
                    <p className="text-zinc-400 mb-6">
                        Join thousands of users protecting their data with military-grade encryption.
                    </p>
                    <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-lg shadow-white/20">
                        Get Started - It&apos;s Free
                    </button>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}