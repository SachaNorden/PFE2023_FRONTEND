'use client'
import {fetchArticles} from "@/lib/api";
import {useEffect, useState} from "react";
import AddButton from "@/app/ui/addButton";
import ListeArticles from "@/app/ui/articles/listeArticles";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Articles() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            {isAdmin ? (
                <div>
                    <ListeArticles articles={articles}/>
                    <AddButton link="/articles/ajouterArticle"/>
                    <LogOutButton/>
                </div>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Articles;
