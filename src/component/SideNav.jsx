import style from './sideNav.module.css'

export default function SideNav() {
    
    return(
        <>
            <div className={style.SideNav}>
                <ul className={style.NavIcon}>
                    <li className={style.icon}><i className="fa-solid fa-house"></i></li>
                    <li className={style.icon}><i className="fa-solid fa-compass"></i></li>
                    <li className={style.icon}><i className="fa-regular fa-star"></i></li>
                </ul>
                
            </div>
        </>
    )
}

