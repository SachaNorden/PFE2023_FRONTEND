'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchArticles, fetchLivraisonArticle} from "@/lib/api";
import {useNavigate} from "react-router-dom";
import back from "@/public/arrow-left.svg";
import {Button} from "antd";


export default function ArticleLivraison() {
    const [detailsLivraison, setDetailsLivraison] = useState(null);
    const [articlesDetails, setArticlesDetails] = useState({});
    const navigate = useNavigate();

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
        // Fetch les noms des articles
        const fetchArticleNames = async () => {
            try {
                const articlesData = await fetchArticles();
                setArticlesDetails(articlesData.reduce((acc, article) => {
                    acc[article.id] = article.nom;
                    return acc;
                }, {}));
            } catch (error) {
                console.error("Erreur lors de la récupération des noms des articles:", error);
            }
        }
        fetchDetails();
        fetchArticleNames();
    }, []);

    const handleCloture = () => {
        // Passer les détails de la livraison dans l'état de navigation
        navigate(`${window.location.pathname}/article`, { state: { detailsLivraison } });
        window.location.reload();
    };

    function handleBackClick() {
        // Prendre l'URL actuelle et diviser en segments
        const urlSegments = window.location.pathname.split('/');

        // Enlever les deux derniers segments
        const newPath = urlSegments.slice(0, -1).join('/');
        // Rediriger vers la nouvelle URL
        navigate(newPath);
        window.location.reload()
    }
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-xs">

                    <FormComponent>
                        <img src={back.src} onClick={handleBackClick} alt="Back" className="w-6 h-6"/>
                        {detailsLivraison && detailsLivraison.length > 0 ? ( // Vérifiez que 'detailsLivraison' est un tableau et qu'il contient des éléments
                            <div>
                                <div className="text-2xl">Livraison :</div>
                                <div className="text-lg">Articles :</div>
                                <ul>
                                    {detailsLivraison.map(item => (
                                        <li key={item.article}>
                                            <div className="font-bold">{articlesDetails[item.article]}</div> : {item.quantite}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="text-lg" onClick={handleCloture }>Clôturer</Button>
                            </div>
                        ) : (
                            <p>Chargement des détails de la livraison...</p>
                        )}
                    </FormComponent>
                </div>
            </div>
        </div>
    );
}
