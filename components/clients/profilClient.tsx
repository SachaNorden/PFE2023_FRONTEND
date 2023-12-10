'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/components/ui/button";
import {updateClient} from "@/lib/api"
function ProfilClient({client}) {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await updateClient(client.id, values.nom, values.adresse_complete);
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
                <p className="text-4xl flex flex-col justify-center items-center">Modifier le client</p>
                <div className='mb-4'>
                    <Form.Item
                        label="Nom"
                        name="nom"
                        rules={[{required: true, message: "Please input your name"}]}
                        required
                    >
                        <Input placeholder={`${client?.nom ?? 'Non spécifié'}`}/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Adresse"
                        name="adresse"
                        rules={[{required: true, message: "Please input your address"}]}
                        required
                    >
                        <Input placeholder={`${client?.adresse_complete ?? 'Non spécifié'}`}/>
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

export default ProfilClient;
