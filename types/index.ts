export interface Client {
    id: string,
    nom: string,
    adresse_complete: string,
}

export interface Article {
    article: string,
    quantite: number,
}

export interface Commande {
    langesS: number,
    langesM: number,
    langesL: number,
    inserts: number,
    poubelles: number,
    gants: number,
}

export const articlesIds = new Map<number, string>([
    [1, "langesS"],
    [2, "langesM"],
    [3, "langesL"],
    [4, "inserts"],
    [5, "poubelles"],
    [6, "gants"],
]);

export interface Livraison {
    id: string,
    client: Client,
    date_livraison: string,
    status: string,
    isModified: boolean,
}

export interface Item {
    article: string,
    quantite: string,
}

export interface Itineraire {
    id: string,
    client: object,
    livreur: Livreur,
    status: string,
}

export interface ArticleTotal {
    nom: string,
    quantite: number,
}

export interface Livreur {
    id: string,
    username: string,
    isAdmin: boolean,
}