import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const BASE_URL = 'http://localhost:8000';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/token/`, {username, password});
        const token = response.data.access;
        return token;
    } catch (error) {
        throw new Error('Erreur lors de la connexion');
    }
};

export async function logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
}

export const decodeJWT = (token: string) => {
    try {
        if (token === '') throw new Error('Token invalide');
        return jwtDecode(token);
    } catch (error) {
        console.error('Erreur lors du décodage du JWT', error);
        throw new Error('Erreur lors du décodage du JWT');
    }
};

export async function fetchArticles() {
    try {
        const response = await fetch(`${BASE_URL}/articles/`);
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
        const response = await fetch(`${BASE_URL}/articles/${id}/`);
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
        const response = await fetch(`${BASE_URL}/articles/${id}/`, {
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
        const response = await fetch(`${BASE_URL}/articles/`, {
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
        const response = await fetch(`${BASE_URL}/articles/${id}/`, {
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
        const response = await fetch(`${BASE_URL}/users/`);
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
        const response = await fetch(`${BASE_URL}/users/${id}/`);
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
        const response = await fetch(`${BASE_URL}/users/${id}/`, {
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
        const response = await fetch(`${BASE_URL}/users/`, {
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
        const response = await fetch(`${BASE_URL}/users/${id}/`, {
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
        const response = await fetch(`${BASE_URL}/clients/`);
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
        const response = await fetch(`${BASE_URL}/clients/${id}/`);
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
        const response = await fetch(`${BASE_URL}/clients/${id}/`, {
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
        const response = await fetch(`${BASE_URL}/clients/`, {
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
        const response = await fetch(`${BASE_URL}/clients/${id}/`, {
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

export async function getLivraisonById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/${id}/`);
        if (!response) {
            throw new Error(`Livraison avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération de la livraison');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la livraison avec l'identifiant ${id}.`);
    }
}

export async function fetchLivraisons() {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des itineraires');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des itineraires');
    }
}

export async function getItineraireById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/itineraires/${id}/`);
        if (!response) {
            throw new Error(`Itineraire avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Erreur lors de la récupération de l'itinéraire`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'itinéraire avec l'identifiant ${id}.`);
    }
}

export async function fetchItineraires() {
    try {
        const response = await fetch(`${BASE_URL}/itineraires/`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de la récupération des itineraires');
        }
    } catch (error) {
        throw new Error('Erreur lors de la récupération des itineraires');
    }
}

export async function fetchLivraisonArticle(id: string) {
    try{
        const response = await fetch(`${BASE_URL}/livraisons/${id}/articles/`);
        if (!response.ok) throw new Error(`Erreur lors de la récupération des articles de la livraison`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des articles de la livraison');
    }
}

export async function addItineraire(livraisons: Object, livreur: Object, status : String) {
    try {
        const response = await fetch(`${BASE_URL}/itineraires/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({livraisons, livreur, status}),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de l'itineraire`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de l'enregistrement d'un nouvel itineraire`);
    }
}

export async function fetchCommandes() {
    try {
        const response = await fetch(`${BASE_URL}/commandes/`);
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

export async function getCommandeById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/${id}/`);
        if (!response) {
            throw new Error(`Commande avec l'article ${id} non trouvé.`);
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

export async function deleteCommande(commandeId: string) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/${commandeId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression de la commande`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la commande`);
    }
}

export async function addCommande(clientId: string) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({client: clientId}),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de l\'ajout de la commande');
        }
    } catch (error) {
        throw new Error('Erreur lors de l\'ajout de la commande');
    }
}

export async function addLigneCommande(id_commande: string, articles: any) {
    try {
        // @ts-ignore
        const formattedArticles = articles.map(({ article, quantite }) => ({
            article: article,
            quantite: quantite,
        }));

        const response = await fetch(`${BASE_URL}/commandes/${id_commande}/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedArticles),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors de l\'ajout de la commande');
        }
    } catch (error) {
        throw new Error('Erreur lors de l\'ajout de la commande');
    }
}
        
export async function updateCommande(id: string, articles: any) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/${id}/articles/`, {
          method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({articles}),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la commande');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la commande avec l'identifiant ${id}`);
    }
}

export async function getArticlesByLivraisonsId(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/${id}/articles/`);
        if (!response) {
            throw new Error(`Articles de la livraison avec l'identifiant ${id} non trouvé.`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des articles de la livraison avec l'identifiant ${id}.`);
    }
}

interface Article {
    article: number;
    quantite: number;
}

export async function updateLivraison(id: string, articles: Article[]) {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/${id}/articles/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articles),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la livraison');
        }
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la livraison avec l'identifiant ${id}`);
    }
}

export async function getLivraionById(livraisonId: string) {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/${livraisonId}/articles/`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de la livraison du client avec l'identifiant ${livraisonId}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'id de la commande du client avec l'identifiant du client : ${clientId}`);
    }
}

export async function fetchLivraisonParClient(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/livraisons/livraison-par-client/${id}/`);
        if (!response) {
            throw new Error(`Articles de la livraison avec l'identifiant ${id} non trouvé.`);
        }
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Erreur lors de la récupération de l'id`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'id ${id}.`);
    }
}

export async function getCommandeByClientId(clientId: string) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/client/${clientId}/`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de la commande du client avec l'identifiant ${clientId}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la commande du client avec l'identifiant ${clientId}`);
    }
}

export async function getCommandeIdDuClientId(clientId: string) {
    try {
        const response = await fetch(`${BASE_URL}/commandes/commande-par-client/${clientId}/`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de l'id de la commande du client avec l'identifiant : ${clientId}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de l'id de la commande du client avec l'identifiant du client : ${clientId}`);
    }
}