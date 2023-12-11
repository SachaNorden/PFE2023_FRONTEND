'use client'
import {Image} from "antd";
import {getArticleById} from "@/lib/api";
import {useEffect, useState} from "react";
import ProfilArticle from "@/app/ui/articles/profilArticle";

function Profil() {
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
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ProfilArticle article={article}/>
        </div>
    );
}

export default Profil;
