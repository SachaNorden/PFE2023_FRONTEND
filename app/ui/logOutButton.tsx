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
                <span style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<LogoutOutlined className="h-5 w-5" />}
                        onClick={handleLogout}
                        style={{ backgroundColor: 'red', border: 'none' }}
                    />
                </span>
        </Link>
    );
};

export default LogoutButton;