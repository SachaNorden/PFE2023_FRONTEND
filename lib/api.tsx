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
        throw new Error('Erreur lors de la récupération des articles');
    }
}

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/');
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des users');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des users');
    }
}

export async function fetchClients() {
    try {
        const response = await fetch('http://localhost:8000/clients/');
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des clients');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des clients');
    }
}