'use client';
import {Form, Input, message} from 'antd';
import {Button} from '@/app/ui/button';
import {updateCommande} from '@/lib/api';
import {useEffect} from "react";
import {wait} from "next/dist/lib/wait";

function ProfilCommande({commande}) {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await updateCommande(commande.id);
            message.success('Commande mis à jour avec succès');
            await wait(1000);
            window.location.href = '/commandes/';
        } catch (error) {
            message.error("Erreur lors de la mise à jour de la commande");
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            form.setFieldsValue({});
            form.submit = handleSubmit;
        }
    }, [commande, form]);

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{remember: true}}
                autoComplete='off'
                className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
            >
                <p className='text-4xl flex flex-col justify-center items-center'>Modifier la commande</p>
                <div className='mb-4'>
                    <Form.Item
                        label='1'
                        name='1'
                        rules={[{required: true, message: 'Please input 1'}]}
                        required
                    >
                        <Input /*placeholder={`${client?.nom ?? 'Non spécifié'}`}*//>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label='2'
                        name='2'
                        rules={[{required: true, message: 'Please input 2'}]}
                        required
                    >
                        <Input /*placeholder={`${client?.adresse_complete ?? 'Non spécifié'}`}*//>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>Enregistrer</Button>
                </div>
            </Form>
        </div>
    );
}

export default ProfilCommande;
