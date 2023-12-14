'use client'
import {Image} from "antd";
import {getArticleById} from "@/lib/api";
import {useEffect, useState} from "react";
import ProfilArticle from "@/app/ui/articles/profilArticle";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Profil() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const [article, setArticle] = useState([]);
    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const clientId = parts[parts.length - 1];
        const fetchData = async () => {
            try {
                const data = await getArticleById(clientId);
                setArticle(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer />
            {isAdmin ? (
                <ProfilArticle article={article}/>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Profil;
