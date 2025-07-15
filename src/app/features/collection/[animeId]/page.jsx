'use client'
import { useCollectionStore } from '@/app/stores/collectionStore'
import { useParams } from 'next/navigation'
import EpisodesAndCharacters from '@/app/anime/[id]/EpisodesAndCharacters'

export default function CollectionAnimeDetails() {
  const { animeId } = useParams();
  const collection = useCollectionStore(state => state.collection);
  const entry = collection[animeId];

  if (!entry) return <div>Not owned.</div>;

  // Fetch anime data as usual (or use entry.anime)
  const anime = entry.anime;
  const ownedEpisodes = entry.episodes === "all" ? null : entry.episodes;

  return (
    <section>
      <h1>{anime.title}</h1>
      <EpisodesAndCharacters anime={anime} owned={ownedEpisodes} />
    </section>
  );
}