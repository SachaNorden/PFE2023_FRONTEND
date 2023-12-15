import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Link from 'next/link';

interface AddButtonProps {
    link: string;
}

function AddButton({link}: AddButtonProps) {
    return (
        <Link href={link}>
            <span className="fixed bottom-4 left-4 z-50">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined/>}
                    className="bg-green-600 border-none"
                />
            </span>
        </Link>
    );
}

export default AddButton;
