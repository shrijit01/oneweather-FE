import React from 'react';
import style from './Navbar.module.css'

export default function Navbar() {
    return (
        <div className={style.navbar}>
                <a className={style.heading} href='/'>
                    <img src='Oneweather.png'  alt='one weather'/>
                </a>
            {/* <i className="ri-search-line sp-01"></i> */}
            <a href='https://github.com/shrijit01' target='_blank' rel="noreferrer"><i className="ri-github-line"></i></a>
        </div>
    )
}
