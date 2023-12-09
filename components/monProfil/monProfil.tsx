'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/components/ui/button";
import {updateUser} from "@/lib/api";

function MonProfil({user}) {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await updateUser(user.id, values.username, values.password);
            message.success("Profil mis à jour avec succès");
        } catch (error) {
            message.error("Erreur lors de la mise à jour du profil");
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
                <p className="text-4xl flex flex-col justify-center items-center">Modifier mon profil</p>
                <div className='mb-4'>
                    <Form.Item
                        label="Nom"
                        name="username"
                        rules={[{required: true, message: "Please input your username"}]}
                        required
                    >
                        <Input placeholder={`${user?.username ?? 'Non spécifié'}`}/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[{required: true, message: "Please input your password"}]}
                        required
                    >
                        <Input placeholder={`${user?.password ?? 'Non spécifié'}`}/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default MonProfil;
