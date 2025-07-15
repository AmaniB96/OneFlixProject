'use client'

import Link from 'next/link';
import styles from './latestAnime.module.css';
// Étape 1: Importer la nouvelle fonction
import { generateDeterministicPrice } from '@/utils/pricing'; // Ajustez le chemin si besoin

export default function BuyButtonClient({ anime }) {
    // Étape 2: On n'a plus besoin du store ici. On génère le prix directement.
    const price = generateDeterministicPrice(anime.mal_id);

    return (
        <Link href={{
            pathname: `/anime/${anime.mal_id}`,
            query: { price: price } // On passe le prix généré à la page de détails
        }}>
            <button className={styles.watchBtn}>Buy Now</button>
        </Link>
    );
}