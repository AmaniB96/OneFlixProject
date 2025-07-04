"use client"

import { useEffect, useRef } from "react"; 
import Image from "next/image";
import logo from "../../assets/logotest-removebg-preview.png";
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
            // Autoplay was prevented.
            // This is an expected behavior, so we can console.log a friendly message
            // instead of seeing a red error.
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
          <Image src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Oneflix</h1>
        </div>

        <div className={styles.logoTop}>
          <Image src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>
            <span>One</span>flix
          </h1>
        </div>

        <div className={styles.logoBottom}>
          <Image src={logo} alt="Logo" className={styles.logo} />
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