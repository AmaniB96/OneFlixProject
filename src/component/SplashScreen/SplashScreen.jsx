"use client"

import { useEffect, useRef } from "react"; 
import Image from "next/image";
import styles from "./splashScreen.module.css";

export default function SplashScreen() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/samurai-slash-6845.mp3');

    const soundTimeout = setTimeout(() => {
      if (audioRef.current) {
        // Attempt to play the sound and catch any errors
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
    
            console.log("Audio playback was prevented by the browser's autoplay policy.");
          });
        }
      }
    }, 1500);

    return () => {
      clearTimeout(soundTimeout);
    };
  }, []);
  return (
    <div className={styles.splash}>
      <div className={styles.logoContainer}>
        <div className={styles.logoOriginal}>
          <Image
            className={styles.logoOne}
            src="/assets/logotest-removebg-preview.png"
            width={80}
            height={80}
            alt="Logo"
          />
          <h1 className={styles.title}>Oneflix</h1>
        </div>

        <div className={styles.logoTop}>
          <Image
            className={styles.logoOne}
            src="/assets/logotest-removebg-preview.png"
            width={80}
            height={80}
            alt="Logo"
          />
          <h1 className={styles.title}>
            <span>One</span>flix
          </h1>
        </div>

        <div className={styles.logoBottom}>
          <Image
            className={styles.logoOne}
            src="/assets/logotest-removebg-preview.png"
            width={80}
            height={80}
            alt="Logo"
          />
          <h1 className={styles.title}>
            <span>One</span>flix
          </h1>
        </div>
      </div>

      <div className={styles.cutLine}></div>
      <div className={styles.screenTop}></div>
      <div className={styles.screenBottom}></div>
    </div>
  );
}