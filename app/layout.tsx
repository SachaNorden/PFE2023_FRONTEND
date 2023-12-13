'use client'
import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';
import { BrowserRouter as Router } from 'react-router-dom';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
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
