/**
 * Calcule le total du panier en appliquant la promotion "4+1 gratuit".
 * Si le panier contient 5 articles ou plus, le prix de l'article le moins cher est déduit.
 * @param {Array} cart - Le tableau des articles du panier. Chaque article doit avoir une propriété `price`.
 * @returns {Number} - Le total final après application de la réduction.
 */
export function calculateDiscountedTotal(cart) {
  // S'assurer que le panier est un tableau valide
  if (!Array.isArray(cart) || cart.length === 0) {
    return 0;
  }

  // 1. Calculer le total brut sans réduction
  const rawTotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  // 2. Vérifier si la promotion s'applique (5 articles ou plus)
  if (cart.length < 5) {
    return rawTotal; // Pas de réduction
  }

  // 3. Trouver le prix de l'article le moins cher
  const prices = cart.map(item => parseFloat(item.price || 0));
  const discountAmount = Math.min(...prices);

  // 4. Appliquer la réduction
  const finalTotal = rawTotal - discountAmount;

  return finalTotal;
}