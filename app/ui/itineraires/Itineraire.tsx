'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import CommandeItineraire from "@/app/ui/commandes/commandeItineraire";


function Itineraire({itine}) {
    const [form] = Form.useForm();

    function handleModifierClick() {
        console.log("cliqué (rajouter 'commandeId: any' en param");
    }

    // Vérification de la nullité de itine
    if (!itine) {
        return null; // Ou vous pouvez afficher un message de chargement, etc.
    }

    return (

        <div className='fmb-4'>
            {itine.livreur && (
            <p className="text-base"><b className="text-xl">Itinéraire {itine.id}</b> <span

                className="text-2xl text-green-300 font-bold">{itine.status}</span></p>
                )}
            <p className="text-base">{itine.livreur.username}</p>
            <br/>

            {/* Vérification de la nullité de itine.commandes */}
            {itine.commandes && itine.commandes.length > 0 && (
                itine.commandes.map((commande) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className='flex items-center justify-between flex-grow'>
                        <CommandeItineraire commande={commande} />
                    </div>
                ))
            )}

        </div>

    );
}

export default Itineraire;
