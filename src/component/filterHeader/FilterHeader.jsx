export default async function FilterHeader() {

  const res = await fetch('https://api.jikan.moe/v4/genres/anime')
  const data = await res.json()

  const categories = data.data.map(genre => genre.name);

  return (
    <div className='filterSection'>
      <div className="filterTitle">
        <h4 className="sectionTitle">Categories</h4>
      </div>
      <div className="categories">
        <div className="catSlide">
        {categories.map((cat, idx) => (
          <p key={idx} className="categoryItem">{cat}</p>
        ))}
        </div>
      </div>
    </div>
  );
}