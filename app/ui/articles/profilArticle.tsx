'use client';
import {Form, Input, message} from 'antd';
import {Button} from '@/app/ui/button';
import {updateArticle, updateClient} from '@/lib/api';
import {useEffect} from "react";
import {wait} from "next/dist/lib/wait";

function ProfilArticle({article}) {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await updateArticle(article.id, values.nom);
            message.success('Article mis à jour avec succès');
            await wait(1000);
            window.location.href = '/articles/';
        } catch (error) {
            message.error("Erreur lors de la mise à jour de l'article");
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            form.setFieldsValue({
                nom: article?.nom ?? 'Non spécifié',
            });
            form.submit = handleSubmit;
        }
    }, [article, form]);

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{remember: true}}
                autoComplete='off'
                className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
            >
                <p className='text-4xl flex flex-col justify-center items-center'>Modifier Article</p>
                <div className='mb-4'>
                    <Form.Item
                        label='Nom'
                        name='nom'
                        rules={[{required: true, message: 'Please input your name'}]}
                        required
                    >
                        <Input placeholder={`${article?.nom ?? 'Non spécifié'}`}/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>Enregistrer</Button>
                </div>
            </Form>
        </div>
    );
}

export default ProfilArticle;
