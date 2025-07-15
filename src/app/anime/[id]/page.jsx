import AnimeDetailsClient from './AnimeDetailsClient';

// On transforme la page en Composant Serveur pour charger les données
export default async function AnimeDetailsPage({ params }) {
    
    // Fonction pour charger les détails d'un anime spécifique
    async function getAnimeDetails(id) {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            if (!res.ok) throw new Error("Failed to fetch anime details");
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const anime = await getAnimeDetails(params.id);

    // Si l'anime n'a pas pu être chargé, on affiche une erreur
    if (!anime) {
        return <div>Could not load anime details. Please try again later.</div>;
    }

    // On passe l'anime chargé au composant client qui gère l'affichage et l'interactivité
    return <AnimeDetailsClient anime={anime} />;
}