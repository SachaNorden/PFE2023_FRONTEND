'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/components/ui/button";
import {addArticle} from "@/lib/api";
import Link from "next/link";

function AjoutArticle() {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addArticle(values.nom);
            message.success("Article ajouté");
        } catch (error) {
            message.error("Erreur lors de l'ajout de l'article");
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>
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
                <p className="text-4xl flex flex-col justify-center items-center">Ajouter Article</p>
                <div className='mb-4'>
                    <Form.Item
                        label="Nom"
                        name="nom"
                        rules={[{required: true, message: "Entrez le nom de l'article"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                    <Link href={`/articles/`}>
                        <Button>
                            Retour
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default AjoutArticle;
