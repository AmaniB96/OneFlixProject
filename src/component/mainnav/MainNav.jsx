import Image from 'next/image'
import style from './mainNav.module.css'
import Link from 'next/link'


export default function MainNav() {
    return (
        <div className={style.MainNav}>
            <Link href='/' className={style.logoDiv}>
                <Image
                    className={style.logoOne}
                    src="/assets/logotest-removebg-preview.png"
                    width={80}
                    height={80}
                    alt="Logo"
                />
                <p className={style.logoText}><span>One</span>flix</p>
            </Link>
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
    )
}