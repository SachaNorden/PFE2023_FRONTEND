'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {addUser} from "@/lib/api";
import Link from "next/link";

function AjoutUser() {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addUser(values.username, values.password);
            message.success("Livreur ajouté");
        } catch (error) {
            console.error("Erreur lors de l'ajout du livreur");
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
                <p className="text-4xl flex flex-col justify-center items-center">Ajouter Livreur</p>
                <div className='mb-6'>
                    <Form.Item
                        label="Nom"
                        name="username"
                        rules={[{required: true, message: "Introduire le nom du livreur"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Mot de passe"
                        name="password"
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Link href={`/users/`}>
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

export default AjoutUser;
