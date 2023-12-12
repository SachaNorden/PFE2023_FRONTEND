'use client'
import React, { useEffect, useState } from "react";
import FormComponent from "@/app/ui/Form.component";
import MenuDer from "@/app/ui/menu/menuAdmin";
import ArticleLivraison from "@/app/ui/livraison/articleLivraison";
import {getArticlesByLivraisonsId, getItineraireById, getLivraisonById} from "@/lib/api";
import {message} from "antd";

export default function Livraison() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Utilisation de la méthode 'location.pathname' pour obtenir le chemin de l'URL
        const currentPath = window.location.pathname;
        const parts = currentPath.split('/');
        const livraisonId = parts[parts.length - 2];
        const fetchData = async () => {
            try {
                const data = await getArticlesByLivraisonsId(livraisonId);
                setArticles(data);
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchData();
    }, []); // Dépendance vide pour exécuter une seule fois au montage

    const [livraison, setLivraison] = useState([]);

    useEffect(() => {
        // Utilisation de la méthode 'location.pathname' pour obtenir le chemin de l'URL
        const currentPath = window.location.pathname;
        const parts = currentPath.split('/');
        const livraisonId = parts[parts.length - 2];
        const fetchData = async () => {
            try {
                const data = await getLivraisonById(livraisonId);
                setLivraison(data);
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchData();
    }, []);

    if (!livraison) {
        return null; // Ou vous pouvez afficher un message de chargement, etc.
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <MenuDer></MenuDer>
            <p className="text-4xl flex flex-col justify-center items-center">Modfication Livraison</p>

                <p className="text-2xl flex flex-col justify-center items-center">Livaison n°{livraison.id}</p>
                {livraison.client && (
                    <p className="text-xs flex flex-col justify-center items-center">{livraison.client.adresse_complete}</p>
                )}
                {articles.length > 0 && livraison  && (
                    <ArticleLivraison articles={articles} livraison={livraison}></ArticleLivraison>

                )}
        </div>
    );
}
