export async function fetchArticles() {
    try {
        const response = await fetch('http://localhost:8000/articles/');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des articles');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des articles');
    }
}

export async function getArticleById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/articles/${id}/`);
        if (!response) {
            throw new Error(`Utilisateur avec l'article ${id} non trouvé.`);
        }
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération de l article');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'article avec l'identifiant ${id}.`);
    }
}

export async function updateArticle(id: string, nom: string) {
    try {
        const response = await fetch(`http://localhost:8000/articles/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nom}),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l article');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'article avec l'identifiant ${id}`);
    }
}

export async function addArticle(nom: string) {
    try {
        const response = await fetch(`http://localhost:8000/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nom}),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de l'article`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de l'enregistrement d'un nouvel article`);
    }
}

export async function deleteArticle(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/articles/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression de l'article avec l'identifiant ${id}`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de l'article avec l'identifiant ${id}`);
    }
}

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des users');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des users');
    }
}

export async function getUserById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/users/${id}/`);
        if (!response) {
            throw new Error(`Utilisateur avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
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
            body: JSON.stringify({username, password}),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l utilisateur');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'utilisateur avec l'identifiant ${id}`);
    }
}

export async function addUser(username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:8000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout du livreur`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de l'enregistrement d'un nouveau livreur`);
    }
}

export async function deleteUser(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/users/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du livreur avec l'identifiant ${id}`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du livreur avec l'identifiant ${id}`);
    }
}

export async function fetchClients() {
    try {
        const response = await fetch('http://localhost:8000/clients/');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des clients');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des clients');
    }
}

export async function getClientById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/clients/${id}/`);
        if (!response) {
            throw new Error(`Client avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
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
            body: JSON.stringify({nom, adresse_complete}),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du client');
        }
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
            body: JSON.stringify({nom, adresse_complete}),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout du client`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de l'enregistrement d'un nouveau client`);
    }
}

export async function deleteClient(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/clients/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du client avec l'identifiant ${id}`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du client avec l'identifiant ${id}`);
    }
}


export async function getCommandeById(id: string) {
    try {
        const response = await fetch(`http://localhost:8000/commandes/${id}/`);
        if (!response) {
            throw new Error(`Commande avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération de la commande');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la commande avec l'identifiant ${id}.`);
    }
}

export async function fetchCommandes() {
    try {
        const response = await fetch('http://localhost:8000/commandes/');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des commandes');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des commandes');
    }
}