'use client'
import { useOrderStore } from '@/app/stores/orderStore';
import styles from './myaccount.module.css';

export default function AccountPage() {
  const { orders } = useOrderStore();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Order History</h1>

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