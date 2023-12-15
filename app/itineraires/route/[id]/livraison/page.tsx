//[id]/livraison/page.tsx
'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchLivraisonParClient, getItineraireById, getLivraisonById} from "@/lib/api";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import back from "@/public/arrow-left.svg";
import MenuDer from "@/app/ui/menu/menu";
import LogOutButton from "@/app/ui/logOutButton";


interface Itineraire {
    id: string,
    client: object,
    livreur: string,
    status: string,
}

interface Livraison {
    id: string,
    client: Client,
    date_livraison: string,
    status: string,
    isModified: boolean,
}

interface Client {
    id: string,
    nom: string,
    adresse_complete: String,
}

const getStatusColorClass = (status: string) => {
    switch (status) {
        case 'En cours':
            return 'text-sm text-green-500 font-bold';
        case 'Livrée':
            return 'text-sm text-red-500 font-bold';
        case 'En préparation':
            return 'text-sm text-gray-500 font-bold';
        default:
            return 'text-sm text-gray-400 font-bold';
    }
};

export default function LivraisonDetail() {
    const [itineraire, setItineraire] = useState<Itineraire | null>(null);
    const [livraisonsDetail, setLivraisonsDetail] = useState<Livraison[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const urlSegments = window.location.href.split('/');
        const itineraireId = urlSegments[urlSegments.length - 2];

        const fetchItineraireData = async () => {
            try {
                const itineraireData = await getItineraireById(itineraireId);
                setItineraire(itineraireData);

                let newLivraisonsDetail: any[] | ((prevState: Livraison[]) => Livraison[]) = []; // Initialise un tableau vide

                for (const client of itineraireData.clients) {
                    const livraisonsIds = await fetchLivraisonParClient(client.id);
                    for (const livraisonId of livraisonsIds) {
                        const livraisonDetail = await getLivraisonById(livraisonId);
                        // @ts-ignore
                        newLivraisonsDetail = [...newLivraisonsDetail, {...livraisonDetail, client}];
                    }
                }

                setLivraisonsDetail(newLivraisonsDetail); // Met à jour livraisonsDetail après la boucle
            } catch (error) {
                message.error("Erreur lors de la récupération des données.");
            }
        };
        fetchItineraireData();
    }, []);

    function handleBackClick() {
        const newPath = window.location.pathname.split('/').slice(0, -1).join('/');
        navigate(newPath);
        window.location.reload();
    }

    return (
        <div>
            <MenuDer/>
            <br></br>
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="flex-grow text-center text-lg font-bold">
                    <div>Detail livraison:</div>
                </div>
            </div>
            <FormComponent>
                <img src={back.src} onClick={handleBackClick} alt="Back" className="w-6 h-6"/><br/>
                {livraisonsDetail && livraisonsDetail.length > 0 ? (
                    livraisonsDetail.map((livraison: Livraison, index: number) => (
                        <div key={index} className="bg-white rounded-md p-4 mb-4">
                            <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          <p className="mb-1">
            Livraison {livraison.id} pour {livraison.client.nom}
          </p>
          <p className="text-gray-500">{livraison.client.adresse_complete}</p>
            {livraison.isModified && (
                <img src="/bell.svg" alt="Modifiée" className="inline ml-2 w-5 h-5"/>
            )}
        </span>
                                {livraison.status !== "Livrée" ? (
                                    <button
                                        onClick={() => {
                                            // @ts-ignore
                                            navigate(`/itineraires/route/${itineraire.id}/livraison/${livraison.id}`);
                                            window.location.reload();
                                        }}
                                        className="text-blue-700 hover:text-blue-900 text-xs font-semibold"
                                    >
                                        Détails
                                    </button>
                                ) : (
                                    <span className="text-red-500 hover:text-red-900 text-xs font-semibold">
            Finie
          </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Chargement des détails de livraison...</p>
                )}

            </FormComponent>
            <LogOutButton/>
        </div>
    )
}
