import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';
import './globals.css';
import {AuthProvider} from "@/app/contexts/AuthContext";

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <AuthProvider>
                <html lang="en">
                <body className={inter.className + ' bg-orange-200 '}>{children}</body>
                </html>
            </AuthProvider>
        </ClerkProvider>
    );
}
