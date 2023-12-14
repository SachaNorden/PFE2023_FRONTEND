'use client'
import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';
import { BrowserRouter as Router } from 'react-router-dom';
import './globals.css';
import {useEffect} from "react";

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }, []);
    return (
        <ClerkProvider>
            <Router>
            <html lang="en">
            <body className={inter.className + ' bg-orange-200 '}>{children}</body>
            </html>
            </Router>
        </ClerkProvider>
    );
}
