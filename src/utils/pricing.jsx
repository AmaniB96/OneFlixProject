/**
 * Génère un prix déterministe basé sur l'ID de l'anime.
 * Pour un même ID, le prix sera toujours le même.
 * @param {number} mal_id - L'identifiant MAL de l'anime.
 * @returns {string} - Le prix formaté avec 2 décimales.
 */
export function generateDeterministicPrice(mal_id) {
    // On s'assure que l'entrée est un nombre
    const id = Number(mal_id);
    if (isNaN(id)) return '9.99'; // Sécurité

    // Utilise l'ID pour créer une base "pseudo-aléatoire" mais constante
    const base = (id % 20) + 7; // Prix de base entre 7 et 27

    // Utilise les derniers chiffres de l'ID pour choisir une terminaison
    const endings = [0.99, 0.95, 0.49, 0.00];
    const endingIndex = id % endings.length;
    const ending = endings[endingIndex];

    const price = (base + ending).toFixed(2);
    return price;
}

/**
 * Génère une remise aléatoire entre 10% et 30%.
 * @returns {{discountPercent: number, multiplier: number}} - Un objet contenant le pourcentage de remise et le multiplicateur à appliquer.
 */
export function generateRandomDiscount() {
  // Génère un pourcentage de remise entier entre 10 et 30
  const discountPercent = Math.floor(Math.random() * 21) + 10; 
  // Calcule le multiplicateur de prix (ex: 20% de remise -> multiplicateur de 0.80)
  const multiplier = 1 - (discountPercent / 100);
  
  return { discountPercent, multiplier };
}