'use client'
import { useState, useEffect } from 'react';
import { useOrderStore } from '@/app/stores/orderStore';
import { useBalanceStore } from '@/app/stores/balanceStore';
import { useAuthStore } from '@/app/stores/authStore';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import styles from './myaccount.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { orders } = useOrderStore();
  const { balance, addCredit } = useBalanceStore();
  const { user, updateUser } = useAuthStore();
  const { data: session, status } = useSession();
  const [creditAmount, setCreditAmount] = useState('');
  const [cardInfo, setCardInfo] = useState('');
  const router = useRouter();
  
  // États pour les informations du profil
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = !!session || !!user;

  // Charger les informations du profil au chargement
  useEffect(() => {
    if (session?.user) {
      setProfileInfo({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    } else if (user) {
      setProfileInfo({
        name: user.username || '',
        email: user.email || '',
      });
    }
  }, [session, user]);

  // Fonction pour rediriger vers la page de connexion
  const handleRedirectToLogin = () => {
    router.push('/features/auth');
  };

  // Si l'utilisateur n'est pas connecté et le statut de la session est résolu
  if (!isAuthenticated && status !== 'loading') {
    return (
      <div className={styles.notLoggedWrapper}>
        <div className={styles.notLoggedContainer}>
          <h1>Access Restricted</h1>
          <p>You need to be logged in to view your account information.</p>
          <button 
            onClick={handleRedirectToLogin}
            className={styles.loginButton}
          >
            Log In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  // Si le statut de la session est en cours de chargement
  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  // Gérer l'ajout de crédit
  const handleAddCredit = (e) => {
    e.preventDefault();
    const amount = parseFloat(creditAmount);
    if (amount > 0) {
      addCredit(amount);
      toast.success(`Successfully added ${amount.toFixed(2)} € to your balance!`);
      setCreditAmount('');
      setCardInfo('');
    } else {
      toast.error('Please enter a valid amount.');
    }
  };

  // Gérer la mise à jour du profil
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Vérification simple des données
    if (!profileInfo.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    
    if (!profileInfo.email.trim() || !profileInfo.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      
      if (user) {
        updateUser({
          ...user,
          username: profileInfo.name,
          email: profileInfo.email,
        });
      }
      
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Account</h1>

      {/* Nouvelle section de profil */}
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <h2>Profile Information</h2>
          <button 
            onClick={() => setIsEditingProfile(!isEditingProfile)} 
            className={styles.editButton}
          >
            {isEditingProfile ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileUpdate} className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={profileInfo.name}
                onChange={(e) => setProfileInfo({...profileInfo, name: e.target.value})}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={profileInfo.email}
                onChange={(e) => setProfileInfo({...profileInfo, email: e.target.value})}
                className={styles.formInput}
                required
              />
            </div>
            <button type="submit" className={styles.formButton}>Save Changes</button>
          </form>
        ) : (
          <div className={styles.profileInfo}>
            <div className={styles.infoRow}>
              <strong>Name:</strong> 
              <span>{profileInfo.name || 'Not set'}</span>
            </div>
            <div className={styles.infoRow}>
              <strong>Email:</strong> 
              <span>{profileInfo.email || 'Not set'}</span>
            </div>
          </div>
        )}
      </div>

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