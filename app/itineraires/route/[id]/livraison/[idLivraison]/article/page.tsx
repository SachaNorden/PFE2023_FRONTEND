'use client'
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Article from "@/app/ui/livraison/article";
import FormComponent from "@/app/ui/Form.component";
import {fetchLivraisonArticle, getLivraisonById, updateLivraison} from "@/lib/api"; // Assurez-vous que cette fonction est correctement importée

export default function ArticleLivraison() {
    const { state } = useLocation();
    const [articles, setArticles] = useState([]);
    const [livraison, setLivraison] = useState(null);

    const urlSegments = window.location.href.split('/');
    const livraisonId = urlSegments[urlSegments.length - 2];
    useEffect(() => {
        const fetchDetails = async () => {
            // Vérifiez si l'état de la location a les détails, sinon faites un appel API
            if (state && state.detailsLivraison) {
                setArticles(state.detailsLivraison);
            } else {
                try {
                    const data = await fetchLivraisonArticle(livraisonId);
                    setArticles(data); // Assurez-vous que 'data' est un tableau d'objets article
                    getLivraisonById(livraisonId);

                } catch (error) {
                    console.error("Erreur lors de la récupération des détails de la livraison:", error);
                }
            }
        };

        fetchDetails();
    }, [state]);
    console.log("article:",articles);
    const updateQuantity = (articleId, newQuantity) => {
        setArticles((currentArticles) =>
            currentArticles.map((art) =>
                art.article.id === articleId ? { ...art, quantite: newQuantity } : art
            )
        );
    };

    const handleSubmit = async () => {
           try {
            const currentLivraison = await getLivraisonById(livraisonId);
            console.log('currentLivraison à soumettre:', currentLivraison);

            const updatedLivraison = {
                ...currentLivraison,
                status: "Livrée" // Mettez à jour le statut comme nécessaire
            };
            await updateLivraison(
                livraisonId,
                currentLivraison.client,
                currentLivraison.date_livraison,
                "Livrée",
                currentLivraison.isModified
            );

            // Si la mise à jour est réussie, vous pouvez faire autre chose ici, comme rediriger ou afficher un message
            console.log('Mise à jour réussie');
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la livraison:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs">
        <FormComponent>
            {articles.map((article) => (
                <Article
                    key={article.article.id}
                    article={article}
                    updateQuantity={updateQuantity}
                />
            ))}
            <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Valider
            </button>
        </FormComponent>
            </div>
        </div>
    );
}
