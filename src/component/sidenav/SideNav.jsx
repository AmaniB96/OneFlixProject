import Link from 'next/link'
import style from './sideNav.module.css'

export default function SideNav() {
    
    return(
        <>
            <div className={style.SideNav}>
                <ul className={style.NavIcon}>
                    <Link href='/' className={style.icon}><i className="fa-solid fa-house"></i></Link>
                    <Link href='/features/discover' className={style.icon}><i className="fa-solid fa-compass"></i></Link>
                    <Link href='/features/collection' className={style.icon}><i className="fa-regular fa-star"></i></Link>
                </ul>
                
            </div>
        </>
    )
}

