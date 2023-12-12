import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface AddButtonProps {
    link: string;
}

function AddButton({ link }: AddButtonProps) {
    return (
        <Link href={link}>
            <span style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: '#52c41a', border: 'none' }}
                />
            </span>
        </Link>
    );
}

export default AddButton;
