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
import {Form, Input, message} from "antd"; // Assurez-vous que cette fonction est correctement importée

export default function ArticleLivraison() {
    const [articles, setArticles] = useState([]);
    const [articlesDetails, setArticlesDetails] = useState({});
    const [livraison,setLivraison]= useState();
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

        if(articles){
            form.setFieldValue({
                champ1:articles.find(item => item.article === 1)?.quantite || 0,
                champ2:articles.find(item => item.article === 2)?.quantite || 0,
                champ3:articles.find(item => item.article === 3)?.quantite || 0,
                champ4:articles.find(item => item.article === 4)?.quantite || 0,
                champ5:articles.find(item => item.article === 5)?.quantite || 0,
                champ6:articles.find(item => item.article === 6)?.quantite || 0,
            });
        }

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

        const fetchlivraisonID =async ()=>{
            try {
                const currentLivraison = await getLivraisonById(livraisonId);
                setLivraison(currentLivraison);
            }catch (error){
                console.error("Erreur lors de la récupération des noms des articles:", error);
            }
        }

        if(articles.length > 0) {
            const initialValues = {};
            articles.forEach((article, index) => {
                initialValues[`champ${index}`] = article.quantite;
            });
            form.setFieldsValue(initialValues);
        }

        fetchlivraisonID()
        fetchArticleNames();
        fetchDetails();
    }, [articles, form]);
    const updateQuantity = (articleId, newQuantity) => {
        setArticles(currentArticles =>
            currentArticles.map(art => {
                if (art.article === articleId) {
                    return { ...art, quantite: parseInt(newQuantity, 10) };
                }
                return art;
            })
        );
    };



    const handleSubmit = async () => {
           try {
            if(livraison){
                await updateLivraison(
                    livraisonId,
                    livraison.client,
                    livraison.date_livraison,
                    "Livrée",
                    livraison.isModified
                );
            }
            console.log('Mise à jour réussie');
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la livraison:", error);
        }

        try {
            const values = await form.validateFields();
            const articlesToUpdate = articles.map((article, index) => ({
                article: article.article,
                quantite: values[`champ${index}`]
            }));
            await updateLivraisonArticle(livraisonId, articlesToUpdate);
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
                    <Form form={form} onFinish={handleSubmit} autoComplete="off">
                        {articles.map((article, index) =>{
                            return(
                            <Form.Item
                                key={article.article}
                                name={`champ${index}`}
                                rules={[{ required: true, message: "Veuillez saisir la quantité" }]}
                            >
                                <Article
                                    article={articlesDetails[article.article]}
                                    articleID={article.article}
                                    quantite={article.quantite}
                                    updateQuantity={updateQuantity}
                                />
                            </Form.Item>
                            )
                        })}

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Valider
                        </button>
                    </Form>

            </div>
        </div>
    );
}
