'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {addClient} from "@/lib/api";
import Link from "next/link";

function AjoutClient() {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addClient(values.nom, values.adresse_complete);
            message.success("Client ajouté");
        } catch (error) {
            console.error("Erreur lors de l'ajout du client");
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
                <p className="text-4xl flex flex-col justify-center items-center">Ajouter Client</p>
                <div className='mb-4'>
                    <Form.Item
                        label="Nom"
                        name="nom"
                        rules={[{required: true, message: "Please input the client name"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Adresse"
                        name="adresse_complete"
                        rules={[{required: true, message: "Please input the address"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Link href={`/clients/`}>
                        <Button>
                            Retour
                        </Button>
                    </Link>
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AjoutClient;
