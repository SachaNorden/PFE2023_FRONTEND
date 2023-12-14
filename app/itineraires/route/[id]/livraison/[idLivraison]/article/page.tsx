'use client'
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Article from "@/app/ui/livraison/article";
import FormComponent from "@/app/ui/Form.component";
import {
    fetchArticles,
    fetchLivraisonArticle,
    getLivraisonById,
    updateLivraison,
    updateLivraisonArticle
} from "@/lib/api";
import {wait} from "next/dist/lib/wait";
import {Form} from "antd"; // Assurez-vous que cette fonction est correctement importée

export default function ArticleLivraison() {
    const { state } = useLocation();
    const [articles, setArticles] = useState([]);
    const [articlesDetails, setArticlesDetails] = useState({});

    const [form] = Form.useForm();

    const urlSegments = window.location.href.split('/');
    const livraisonId = urlSegments[urlSegments.length - 2];
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchLivraisonArticle(livraisonId);
                setArticles(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la livraison:", error);
            }
        };

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
        fetchArticleNames();
        fetchDetails();
    }, []);
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
            //console.log('currentLivraison à soumettre:', currentLivraison);

               const clientData = {
                   id: currentLivraison.client.id,
                   nom: currentLivraison.client.nom,
                   adresse_complete: currentLivraison.client.adresse_complete,
                   // ... autres propriétés du client si nécessaires
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

        try {
            const values = await form.validateFields();
            const articles = [
                {article: 1, quantite: values.champ1 || 0},
                {article: 2, quantite: values.champ2 || 0},
                {article: 3, quantite: values.champ3 || 0},
                {article: 4, quantite: values.champ4 || 0},
                {article: 5, quantite: values.champ5 || 0},
                {article: 6, quantite: values.champ6 || 0},
            ];
            await updateLivraisonArticle(commandeId, articles);
            message.success("Commande mise à jour avec succès");
            wait(1000);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs">
                <FormComponent>
                    <Form form={form} onFinish={handleSubmit} autoComplete="off">
                        {articles.map((article, index) => (
                            <Form.Item
                                key={article.article}
                                label={articlesDetails[article.article]}
                                name={`champ${index}`}
                                rules={[{ required: true, message: "Veuillez saisir la quantité" }]}
                            >
                                <Article
                                    article={article}
                                    quantite={article.quantite}
                                    updateQuantity={updateQuantity}
                                />
                            </Form.Item>
                        ))}
                    </Form>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Valider
                        </button>

                </FormComponent>
            </div>
        </div>
    );
}
