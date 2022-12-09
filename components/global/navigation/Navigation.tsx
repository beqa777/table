"use client";

import c from "./Naivgation.module.scss";


import Link from 'next/link';
import Logo from "@public/images/lib/logo.svg";




const Navigation = () => {
    return (
        <nav className={c.navigation}>
            <Link href="/" className={c.logo_container} >
                <Logo />
            </Link>
        </nav>
    );
};


export default Navigation;