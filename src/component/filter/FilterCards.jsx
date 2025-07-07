import styles from './filterCards.module.css'
import Image from 'next/image'

export default function FilterSection() {
    
    return(
        <div className={styles.FilterSection}>

          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <Image 
                  src="/assets/snk.jpg" 
                  alt="Anime title"
                  width={180}
                  height={250}
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay}>
                  <div className={styles.cardRating}>
                    <span>★</span>
                    <span>4.8</span>
                  </div>
                  <button className={styles.cardButton}>Watch Now</button>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>Anime Title</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardYear}>2023</span>
                  <span className={styles.cardEpisodes}>24 Episodes</span>
                </div>
                <div className={styles.cardTags}>
                  <span className={styles.tag}>Action</span>
                  <span className={styles.tag}>Fantasy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}