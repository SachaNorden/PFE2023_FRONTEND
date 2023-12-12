'use client';
import {Button, Card, Form, message, Popconfirm} from 'antd';

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
function ItineraireCard({ itineraire }) {
    function handleModifierClick() {
        window.location.href=`/itineraires/${itineraire.id}`
    }

    return (
        <div className='flex items-center mb-4'>
            <div>
                <p>
                    - <b className="text-base">Itinéraire n°{itineraire.id}</b>{' '}
                    <p></p>
                    <span className={getStatusColorClass(itineraire?.status)}>
                        {itineraire?.status ?? 'Non spécifié'}
                    </span>
                </p>
                <p className="text-sm text-gray-400">
                    {itineraire.commandes.map((commande, index) => (
                        <div key={index} className='flex items-center justify-between flex-grow'>
                            <p>{commande.client.nom}</p>
                        </div>
                    ))}
                </p>
                <p>---------------------------------</p>
            </div>

            {itineraire?.status !== 'Livré' && (
                <div className='flex items-center justify-between flex-grow'>
                    <Button type='submit' onClick={handleModifierClick}>
                        Modifier
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ItineraireCard;




