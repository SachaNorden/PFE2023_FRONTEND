'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {updateUser} from "@/lib/api";

const getStatusColorClass = (status) => {
    switch (status) {
        case 'En cours':
            return 'text-sm text-green-500 font-bold';
        case 'Livré':
            return 'text-sm text-red-500 font-bold';
        case 'En préparation':
            return 'text-sm text-gray-500 font-bold';
        default:
            return 'text-sm text-gray-400 font-bold';
    }
};

function CommandeItineraire({commande}) {
    const [form] = Form.useForm();

    function handleModifierClick() {
        window.location.href=`/clients/${commande.id}`
    }

    return (


        <div className='flex items-center mb-4'>
            <div>

                <p>
                    - <b className="text-base">{commande?.client.nom ?? 'Non spécifié'}</b>{' '}
                    <p></p>
                    <span className={getStatusColorClass(commande?.status)}>
                {commande?.status ?? 'Non spécifié'}
            </span>
                </p>
                <p className="text-sm text-gray-400"> {commande?.client.adresse_complete ?? 'Non spécifiée'}</p>
                <p>---------------------------------</p>
            </div>

            {commande?.status !== 'Livré' && (
                <div className='flex items-center justify-between flex-grow'>
                    <Button type='submit' onClick={handleModifierClick}>
                        Modifier
                    </Button>
                </div>
            )}
        </div>


    );
}

export default CommandeItineraire;