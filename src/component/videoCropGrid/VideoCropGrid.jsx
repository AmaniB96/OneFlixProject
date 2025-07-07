import styles from './videoCropGrid.module.css'

export default function VideoCropGrid() {
  return (
    <div className={styles.videoCropContainer}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoCrop}
          src="/videos/One Punch Man - S2E4 (57).mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoCrop}
          src="/videos/Vinland Saga - S1E23 (6).mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoCrop}
          src="/videos/Demon Slayer - S3E11 (38).mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}