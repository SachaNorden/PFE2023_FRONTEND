'use client'
import {useState} from 'react';
import {Form, Input, Image} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
// Make sure your style component imports match what's in your project
import { Button } from '@/components/ui/button'; // Example path, adjust according to your structure

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
            try {
            // Adapt the URL to where your backend API is served
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            // Handle the response here, e.g., save the JWT token, redirect the user, etc.
            console.log(response.data);
            // Redirect the user to the dashboard after successful login

        } catch (error) {
            // Handle errors here, e.g., displaying an error message to the user
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>

            <Image width={200} src="/lapin.svg" preview={false} className='absolute -top-20 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-5' />
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
                <div className='mb-4'>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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
                    <Button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Se Connecter
                    </Button>
                </div>
            </Form>
            <Image width={200} src="/snappiesPieds.png" preview={false} className='absolute left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/3 ' />
        </div>
    );
}
