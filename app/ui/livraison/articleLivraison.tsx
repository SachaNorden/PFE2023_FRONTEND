'use client'

import Article from "@/app/ui/livraison/article";
import {Button} from "@/app/ui/button";
import {Form, message} from "antd";
import {updateLivraison} from "@/lib/api";
import {wait} from "next/dist/lib/wait";
import {useEffect} from "react";

function ArticleLivraison({articles, livraison}) {
    console.log(articles);
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {

            await updateLivraison(livraison.id, livraison.client, livraison.date_livraison, livraison.status, true);
            message.success('Livraison mis à jour avec succès');
            await wait(1000);
            window.location.href = '/itineraires/';
        } catch (error) {
            message.error("Erreur lors de la mise à jour de la livraison");
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            form.submit = handleSubmit;
        }
    }, [form, handleSubmit]);

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{remember: true}}
            autoComplete='off'
            className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
        >
            <div className='flex flex-col justify-center items-center'>
                <br/> <br/>
                {articles.map((article) => (
                    // eslint-disable-next-line react/jsx-key
                        <Article article={article}/>

                ))}
                <div className='flex items-center justify-between'>
                    <Button type='submit'>Enregistrer</Button>
                </div>
            </div>
        </Form>
    );
}

export default ArticleLivraison;
