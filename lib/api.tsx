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

export async function getUserById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/users/${id}/`);
        if (!response) { throw new Error(`Utilisateur avec l'identifiant ${id} non trouvé.`); }
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération de l utilisateur');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'identifiant ${id}.`);
    }
}

export async function updateUser(id: string, username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:8000/users/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) { throw new Error('Erreur lors de la mise à jour de l utilisateur'); }
        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'utilisateur avec l'identifiant ${id}`);
    }
}

export async function getClientById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/clients/${id}/`);
        if (!response) { throw new Error(`Client avec l'identifiant ${id} non trouvé.`); }
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération du client');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du client avec l'identifiant ${id}.`);
    }
}

export async function updateClient(id: string, nom: string, adresse_complete: string) {
    try {
        const response = await fetch(`http://localhost:8000/clients/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom, adresse_complete }),
        });
        if (!response.ok) { throw new Error('Erreur lors de la mise à jour du client'); }
        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du client avec l'identifiant ${id}`);
    }
}

export async function addClient(nom: string, adresse_complete: string) {
    try {
        const response = await fetch(`http://localhost:8000/clients/`, {
            method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom, adresse_complete }),
        });
        if (!response.ok) { throw new Error(`Erreur lors de l'ajout du client`); }
    } catch (error) {
        throw new Error(`Erreur lors de l'enregistrement d'un nouveau client`);
    }
}