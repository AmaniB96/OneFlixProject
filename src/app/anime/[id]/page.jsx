import AnimeDetailsClient from './AnimeDetailsClient';

export default async function AnimeDetails({ params }) {
    const id = params.id;
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await res.json();
    const anime = data.data;

    return <AnimeDetailsClient anime={anime} />;
}