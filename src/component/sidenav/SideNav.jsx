'use client'
import Link from 'next/link'
import style from './sideNav.module.css'
import { usePathname } from 'next/navigation'

export default function SideNav() {
    const pathname = usePathname();

    const isActive = (path) => {
        // Pour la page d'accueil
        if (path === '/' && pathname === '/') return true;
        // Pour les autres pages, vérifier si le chemin actuel commence par le chemin du lien
        return path !== '/' && pathname.startsWith(path);
    };
    
    return(
        <nav className={style.SideNav}>
            <ul className={style.NavIcon}>
                <Link href='/' className={isActive('/') ? style.activeIcon : style.icon}>
                    <i className="fa-solid fa-house"></i>
                    <span className={style.iconLabel}>Home</span>
                </Link>
                <Link href='/features/discover' className={isActive('/features/discover') ? style.activeIcon : style.icon}>
                    <i className="fa-solid fa-compass"></i>
                    <span className={style.iconLabel}>Discover</span>
                </Link>
                <Link href='/features/collection' className={isActive('/features/collection') ? style.activeIcon : style.icon}>
                    <i className="fa-regular fa-star"></i>
                    <span className={style.iconLabel}>Collection</span>
                </Link>
                <Link href='/features/myaccount' className={isActive('/features/myaccount') ? style.activeIcon : style.icon}>
                    <i className="fa-solid fa-user"></i>
                    <span className={style.iconLabel}>Account</span>
                </Link>
            </ul>
        </nav>
    )
}

