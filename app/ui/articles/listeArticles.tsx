import ArticleCard from "@/app/ui/articles/articleCard";
import { Key } from "react";

// @ts-ignore
function ListeArticles({articles}) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des articles</h1>
            {articles.map((article: { id: Key | null | undefined; }) => (
                <ArticleCard key={article.id} client={article} />
            ))}
        </div>
    );
}

export default ListeArticles;
