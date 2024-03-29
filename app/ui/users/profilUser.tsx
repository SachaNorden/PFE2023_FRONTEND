'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {updateUser} from "@/lib/api";
import Link from "next/link";

// @ts-ignore
function ProfilUser({user}) {
    const [form] = Form.useForm();
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await updateUser(user.id, values.username, values.password);
            message.success("Profil mis à jour avec succès");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil");
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
                        <Input placeholder={`*****`}/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    {isAdmin ? (
                        <Link href={`/users/`}>
                            <Button>Retour</Button>
                        </Link>
                    ) : (
                        <Link href={`/itineraires/`}>
                            <Button>Retour</Button>
                        </Link>
                    )}
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default ProfilUser;
