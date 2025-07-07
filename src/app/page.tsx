import Featured from '../component/featured/Featured';
import HeroSection from '../component/heroSection/HeroSection';
import VideoCropGrid from '../component/videoCropGrid/VideoCropGrid';
import FilterHeader from '../component/filterHeader/FilterHeader';
import CardsCarousel from '../component/cardsCarousel/CardsCarousel';

export default function Home() {
  return (
    <>
      <div className="MainDiv">
        <HeroSection />
        <VideoCropGrid />
      </div>

      <Featured />

      <FilterHeader />
      <CardsCarousel />
    </>
  );
}
