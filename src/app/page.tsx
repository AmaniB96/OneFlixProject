export default function Home() {
  return (
    <>
      

      <div className="MainDiv" >
        <div className="heroText">
          <h1>
            Every single animes you ever needed, in ONE place
          </h1>
          <button className="btn">Explore</button>
        </div>
        <div className="video-crop-container">
          <video
            className="video-crop"
            src="/videos/One Punch Man - S2E4 (57).mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <video
            className="video-crop"
            src="/videos/Vinland Saga - S1E23 (6).mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <video
            className="video-crop"
            src="/videos/Demon Slayer - S3E11 (38).mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </>
  );
}
