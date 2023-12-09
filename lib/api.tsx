export async function fetchArticles() {
    try {
        const response = await fetch('http://localhost:8000/articles/');
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des articles');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des articles', error);
    }
}