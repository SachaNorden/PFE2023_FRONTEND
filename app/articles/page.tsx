'use client'
import {Image} from "antd";
import {fetchArticles} from "@/lib/api";
import {useEffect, useState} from "react";
import AddButton from "@/app/ui/addButton";
import ListeArticles from "@/app/ui/articles/listeArticles";
import LogOutButton from "@/app/ui/logOutButton";

function Articles() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const [articles, setArticles] = useState([]);
    const handleDelete = async () => {
        //const updatedArticles = await fetchArticles();
        //setArticles(updatedArticles);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            {isAdmin ? (
                <div>
                    <ListeArticles articles={articles} onDelete={handleDelete()}/>
                    <AddButton link="/articles/ajouterArticle"/>
                    <LogOutButton/>
                </div>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Articles;
