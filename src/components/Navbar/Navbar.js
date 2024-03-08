import React from 'react';
import style from './Navbar.module.css'

export default function Navbar() {
    return (
        <div className={style.navbar}>
            <h3 className={style.heading}>one weather</h3>
            {/* <i className="ri-cloudy-2-line"></i> */}
            {/* <i className="ri-search-line sp-01"></i> */}
            <i className="ri-menu-line"></i>
        </div>
    )
}
