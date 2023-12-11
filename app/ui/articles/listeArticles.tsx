import ArticleCard from "@/app/ui/articles/articleCard";

function ListeArticles({ articles, onDelete }) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des articles</h1>
            {articles.map((article) => (
                <ArticleCard key={article.id} client={article} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default ListeArticles;
