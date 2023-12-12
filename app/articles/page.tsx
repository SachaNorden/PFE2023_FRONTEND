'use client'
import {Image} from "antd";
import {fetchArticles} from "@/lib/api";
import {useEffect, useState} from "react";
import ListeClients from "@/app/ui/clients/listeClients";
import AddButton from "@/app/ui/addButton";
import ListeArticles from "@/app/ui/articles/listeArticles";

function Articles() {
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
            <ListeArticles articles={articles} onDelete={handleDelete()}/>
            <AddButton link="/articles/ajouterArticle" />
        </div>
    );
}

export default Articles;
