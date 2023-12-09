import {Form, Image, Input} from "antd";
import {useState} from "react";
import {Button} from "@/components/ui/button";

function MonProfil({ user }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {};

    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>
            <Image width={200} src="/lapin.svg" preview={false} className='absolute -top-20 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5' />
            <Form
                onFinish={handleSubmit}
                initialValues={{ remember: true }}
                autoComplete="off"
                className='
                  p-8
                  border-2 border-gray-300
                  rounded-lg
                  shadow-xl
                  bg-white
                  relative
                  z-20'
            >
                <p className="text-4xl flex flex-col justify-center items-center">Mon profil</p>
                <div className='mb-4'>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username" }]}
                        required
                    >
                        <Input placeholder={`${user?.username ?? 'Non spécifié'}`} />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password" }]}
                        required
                    >
                        <Input placeholder={`${user?.password ?? 'Non spécifié'}`} />
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                </div>
            </Form>
            <Image width={200} src="/snappiesPieds.png" preview={false} className='absolute left-1/2 transform -translate-x-1/2 -z10 -translate-y-1/3 ' />
        </div>
    );
}

export default MonProfil;
