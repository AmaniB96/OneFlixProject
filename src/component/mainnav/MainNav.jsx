import Image from 'next/image'
import style from './mainNav.module.css'
import logo from '../../assets/logotest-removebg-preview.png'



export default function MainNav(){

    return(
        <>
            <div className={style.MainNav}>
                <div className={style.logoDiv}>
                    <Image className={style.logoOne} src={logo}></Image>
                    <p className={style.logoText}><span>One</span>flix</p>
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