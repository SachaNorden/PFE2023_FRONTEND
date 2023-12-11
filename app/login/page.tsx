'use client'
import {useState} from 'react';
import {Button, Form, Input, Image, message} from 'antd';
import {login} from "@/lib/api";
import {redirect} from "next/navigation";

export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const token = await login(values.username, values.password);
            localStorage.setItem('token', token);
            message.success('Connexion réussie');
            redirect('/clients/');
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>
            <Image width={200} src="/lapin.svg" preview={false} className='absolute -top-20 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5' />
            <Form
                form={form}
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
                <div className='mb-4'>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username' }]}
                        required
                        >
                        <Input />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Password"
                        name="password"
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Se Connecter
                    </Button>
                </div>
            </Form>
            <Image width={200} src="/snappiesPieds.png" preview={false} className='absolute left-1/2 transform -translate-x-1/2 -z10 -translate-y-1/3 ' />
        </div>
    );
}
