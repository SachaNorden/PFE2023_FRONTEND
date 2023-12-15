'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchArticles, fetchLivraisonArticle} from "@/lib/api";
import {useNavigate} from "react-router-dom";
import back from "@/public/arrow-left.svg";
import {Button} from "antd";
import MenuDer from "@/app/ui/menu/menu";
import LogOutButton from "@/app/ui/logOutButton";

import {Item} from "@/types/index"

export default function ArticleLivraison() {
    const [detailsLivraison, setDetailsLivraison] = useState([]);
    const [articlesDetails, setArticlesDetails] = useState<{ [key: string]: any }>({});
    const navigate = useNavigate();

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
        const fetchArticleNames = async () => {
            try {
                const articlesData = await fetchArticles();
                setArticlesDetails(articlesData.reduce((acc: { [x: string]: any; }, article: {
                    id: string | number;
                    nom: any;
                }) => {
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
        navigate(`${window.location.pathname}/article`, {state: {detailsLivraison}});
        window.location.reload();
    };

    function handleBackClick() {
        const urlSegments = window.location.pathname.split('/');
        const newPath = urlSegments.slice(0, -1).join('/');
        navigate(newPath);
        window.location.reload()
    }

    // @ts-ignore
    return (
        <>
            <MenuDer/>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-xs">
                    <FormComponent>
                        <img src={back.src} onClick={handleBackClick} alt="Back" className="w-6 h-6 mb-4"/>
                        {detailsLivraison && detailsLivraison.length > 0 ? (
                            <div>
                                <div className="text-2xl font-bold mb-2">Livraison :</div>
                                <div className="text-lg font-bold mb-2">Articles :</div>
                                <ul className="list-disc pl-6 mb-4">
                                    {detailsLivraison.map((item: Item) => (
                                        <li key={item.article} className="mb-2">
                                            <div
                                                className="font-bold">{articlesDetails[item.article]} : {item.quantite}</div>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="text-lg" onClick={handleCloture}>
                                    Clôturer
                                </Button>
                            </div>
                        ) : (
                            <p className="text-center">Chargement des détails de la livraison...</p>
                        )}
                    </FormComponent>
                </div>
            </div>
            <LogOutButton/>
        </>
    );

}
