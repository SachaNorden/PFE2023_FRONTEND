'use client'
import { useEffect, useState } from 'react';
import { fetchArticles } from '@/lib/api';

function TestArticles() {
    const [articles, setArticles] = useState([]);
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
        <div>
            <h1>liste des articles</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.nom}</li>
                ))}
            </ul>
        </div>
    );
}
export default TestArticles;