import FilterCards from '../filter/FilterCards';

export default function CardsCarousel() {
  return (
    <div className='Cards'>
      <div className='slideCarousel'>
        <FilterCards />
      </div>
    </div>
  );
}