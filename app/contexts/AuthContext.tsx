import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextData {
    isAdmin: boolean | null;
    setAdmin: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isAdmin, setAdmin] = useState<boolean | null>(null);

    return (
        <AuthContext.Provider value={{ isAdmin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
