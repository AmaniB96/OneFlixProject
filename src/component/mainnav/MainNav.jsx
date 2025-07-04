import style from './mainNav.module.css'

export default function MainNav(){

    return(
        <>
            <div className={style.MainNav}>
                <div className={style.logo}>

                </div>

                <div className={style.leftNavSide}>
                    
                    <div className={style.search}>
                        <input className={style.searchInput} type="text" placeholder='Search for an anime...' />
                        <button className={style.btn}>Search</button>
                    </div>

                    <div>
                        <button className={style.btn}>Login</button>
                    </div>

                </div>

            </div>
        </>
    )
}