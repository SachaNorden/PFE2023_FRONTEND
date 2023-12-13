'use client'

import {Button, Form, Image, Input, message} from 'antd';
import {decodeJWT, getUserById, login} from "@/lib/api";
import {wait} from "next/dist/lib/wait";
import {useState} from "react";


export default function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const token = await login(values.username, values.password);
            const decodedToken = decodeJWT(token);
            const user = await getUserById(decodedToken.user_id);
            message.success('Connexion réussie');
            const isAdmin = user.isAdmin;
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('userId', user.id);
            await wait(1000)
            if(isAdmin) {
                window.location.href = '/clients/';
            } else {
                window.location.href = '/itineraires/';
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>
            <Image width={200} src="/lapin.svg" preview={false}
                   className='absolute -top-20 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5'/>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{remember: true}}
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
                        rules={[{required: true, message: 'Please input your username'}]}
                        required
                    >
                        <Input/>
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
                    <Button htmlType="submit" loading={loading}>
                        Se Connecter
                    </Button>
                </div>
            </Form>
            <Image width={200} src="/snappiesPieds.png" preview={false}
                   className='absolute left-1/2 transform -translate-x-1/2 -z10 -translate-y-1/3 '/>
        </div>
    );
}
