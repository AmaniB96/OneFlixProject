import FilterSection from '../filter/FilterCards';

export default function CardsCarousel() {
  return (
    <div className='Cards'>
      <div className='slideCarousel'>
        <FilterSection />
        <FilterSection />
        <FilterSection />
        <FilterSection />
        <FilterSection />
        <FilterSection />
        <FilterSection />
      </div>
    </div>
  );
}