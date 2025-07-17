'use client'
import { useEffect, useRef } from 'react'
import styles from './featured.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { generateDeterministicPrice } from '@/utils/pricing'



export default function Featured() {
    const featuredRef = useRef(null)
    const imageRef = useRef(null)
    const contentRef = useRef(null)
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const viewportHeight = window.innerHeight
            const featuredElement = featuredRef.current
            const imageElement = imageRef.current
            const contentElement = contentRef.current
            
            if (!featuredElement) return
            
            const featuredOffset = featuredElement.getBoundingClientRect().top
            const distanceToViewport = featuredOffset - viewportHeight
            
            if (featuredOffset < viewportHeight && featuredOffset > -viewportHeight) {
                if (imageElement) {
                    const translateY = featuredOffset * 0.2
                    const scale = 1 + Math.min(0.2, Math.max(0, (viewportHeight - featuredOffset) / (viewportHeight * 4)))
                    imageElement.style.transform = `translateY(${translateY}px) scale(${scale})`
                }
                
                if (contentElement) {
                    const opacity = Math.min(1, Math.max(0, 1 - (featuredOffset / (viewportHeight * 0.5))))
                    const translateY = Math.max(0, featuredOffset * 0.4)
                    contentElement.style.transform = `translateY(${translateY}px)`
                    contentElement.style.opacity = opacity
                }
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
        // 2. Définir l'ID de l'anime et générer son prix
    const animeId = 38000; // Demon Slayer's MAL ID
    const price = generateDeterministicPrice(animeId);
    
    return(
        <div id='featured' className={styles.Featured} ref={featuredRef}>
            <div className={styles.imageWrapper} ref={imageRef}>
                <Image
                    src="/assets/ds.jpg"
                    alt="desc"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className={styles.img}
                />
            </div>

            <div className={styles.contentOverlay} ref={contentRef}>
                <h3>Featured</h3>
                <h1 className={styles.title}>Demon Slayer</h1>
                <p className={styles.description}>
                    Join Tanjiro Kamado's quest for revenge as he fights demons 
                    to turn his sister Nezuko back to human form after their family 
                    is slaughtered in this epic anime series.
                </p>
                <div className={styles.btnDiv}>
                    <Link 
                        href={{
                            pathname: `/anime/${animeId}`,
                            query: { price: price }
                        }} 
                        className={styles.buyButton}
                    >
                        Buy Now
                    </Link>
                    <button className={styles.rate}>8.43 <i className="fa-solid fa-star"></i></button>
                </div>
                
            </div>
        </div>
    )
}