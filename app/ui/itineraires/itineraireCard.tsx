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

// @ts-ignore
function ItineraireCard({ itineraire   }) {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    function handleModifierClick() {
        if(isAdmin){
            window.location.href=`/itineraires/${itineraire.id}`
        }else{
            window.location.href=`/itineraires/route/${itineraire.id}`
        }
    }

    const renderAdminActions = () => {
        if (isAdmin && itineraire?.status !== 'Livré') {
            return (
                <Button type='submit' onClick={handleModifierClick}>
                    Modifier
                </Button>
            );
        }
        return (
            <button type='submit' onClick={handleModifierClick} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </button>
        );
    };

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
                    {renderAdminActions()}
                </p>
                <p>---------------------------------</p>
            </div>
        </div>
    );
}

export default ItineraireCard;




