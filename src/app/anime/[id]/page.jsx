'use client'
import { useFilterStore } from '@/app/stores/filterStore';
import AnimeDetailsClient from './AnimeDetailsClient';

export default function AnimeDetails({ params }) {
    const anime = useFilterStore(
        state => state.animeList.find(a => a.mal_id === Number(params.id))
    );

    if (!anime) return <div>Loading...</div>;

    return <AnimeDetailsClient anime={anime} />;
}