'use client'
import FormComponent from "@/app/ui/Form.component";
import {JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal,
    useEffect,
    useState
} from "react";
import {fetchLivraisonArticle} from "@/lib/api";


export default function ArticleLivraison() {
    const [detailsLivraison, setDetailsLivraison] = useState([]);

    useEffect(() => {
        const livraisonId = window.location.href.split('/').pop();

        const fetchDetails = async () => {
            try {
                if (livraisonId) {
                    const data = await fetchLivraisonArticle(livraisonId);
                    setDetailsLivraison(data);
                } else {
                    console.error("livraisonId n'est pas défini.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la livraison:", error);
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
                            {detailsLivraison.map((item: { article: { id: Key | null | undefined; nom: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; quantite: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
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
