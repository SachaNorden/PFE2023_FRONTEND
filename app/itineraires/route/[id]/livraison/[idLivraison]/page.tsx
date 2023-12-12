'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchLivraisonArticle} from "@/lib/api";


export default function ArticleLivraison() {
    const [detailsLivraison, setDetailsLivraison] = useState(null);


    useEffect(() => {
        const livraisonId = window.location.href.split('/').pop();

        const fetchDetails = async () => {
            try {
                const data = await fetchLivraisonArticle(livraisonId);
                setDetailsLivraison(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la livraison:", error);
                // Gérez l'erreur comme vous le souhaitez, par exemple en affichant un message
            }

        };

        fetchDetails();
    }, []);
    console.log(detailsLivraison);
    return (
        <div>
            <FormComponent>
                {detailsLivraison && detailsLivraison.length > 0 ? ( // Vérifiez que 'detailsLivraison' est un tableau et qu'il contient des éléments
                    <div>
                        <h2>Livraison :</h2>
                        <h3>Articles :</h3>
                        <ul>
                            {detailsLivraison.map((item) => (
                                <li key={item.article.id}>
                                    {item.article.nom} : {item.quantite}
                                </li>
                            ))}
                        </ul>
                        <button>Clôturer</button>
                    </div>
                ) : (
                    <p>Chargement des détails de la livraison...</p>
                )}
            </FormComponent>
        </div>
    );
}