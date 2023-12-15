import { Button } from 'antd';
import { logout } from '@/lib/api';
import { LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    return (
        <Link href='/login/'>
            <span className="fixed bottom-4 right-4 z-50">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="bg-red-600 border-none"
                />
            </span>
        </Link>
    );
};

export default LogoutButton;
