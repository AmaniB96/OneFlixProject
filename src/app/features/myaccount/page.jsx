'use client'
import { useState } from 'react';
import { useOrderStore } from '@/app/stores/orderStore';
import { useBalanceStore } from '@/app/stores/balanceStore';
import toast from 'react-hot-toast'; // 1. Importer la fonction toast
import styles from './myaccount.module.css';

export default function AccountPage() {
  const { orders } = useOrderStore();
  const { balance, addCredit } = useBalanceStore();
  const [creditAmount, setCreditAmount] = useState('');
  const [cardInfo, setCardInfo] = useState(''); // Simule un champ de carte de crédit

  // 3. Gérer la soumission du formulaire pour ajouter du crédit
  const handleAddCredit = (e) => {
    e.preventDefault();
    const amount = parseFloat(creditAmount);
    if (amount > 0) {
      addCredit(amount);
      // 2. Remplacer l'alerte par une notification de succès
      toast.success(`Successfully added ${amount.toFixed(2)} € to your balance!`);
      setCreditAmount('');
      setCardInfo('');
    } else {
      // Optionnel : Gérer le cas où le montant n'est pas valide
      toast.error('Please enter a valid amount.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Account</h1>

      {/* Section pour afficher et recharger le solde */}
      <div className={styles.balanceSection}>
        <div className={styles.currentBalance}>
          <h2>Your Balance</h2>
          <p>{balance.toFixed(2)} €</p>
        </div>
        <form onSubmit={handleAddCredit} className={styles.addCreditForm}>
          <h3>Add Credit</h3>
          <input
            type="number"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            placeholder="Amount in €"
            className={styles.formInput}
            min="5"
            step="1"
            required
          />
          <input
            type="text"
            value={cardInfo}
            onChange={(e) => setCardInfo(e.target.value)}
            placeholder="Credit Card Number"
            className={styles.formInput}
            required
          />
          <button type="submit" className={styles.formButton}>Add to Balance</button>
        </form>
      </div>

      <h2 className={styles.subTitle}>My Order History</h2>

      {orders.length === 0 ? (
        <p className={styles.emptyMessage}>You haven't placed any orders yet.</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <h2 className={styles.orderId}>Order #{order.id.split('-')[1]}</h2>
                  <p className={styles.orderDate}>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.orderTotal}>
                  Total Paid: <span>{order.totalAmount.toFixed(2)} €</span>
                </div>
              </div>
              <div className={styles.itemList}>
                <h3 className={styles.itemsTitle}>Items Purchased:</h3>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemPrice}>{parseFloat(item.price).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}