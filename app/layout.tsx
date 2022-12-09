import "@/styles/main.scss";
import { ReactNode } from "react";
import HeadAndMeta from "components/global/head/HeadAndMeta";
import Navigation from "components/global/navigation/Navigation";

import { Noto_Sans_Georgian, Inter } from '@next/font/google';


const notoGeoFont = Noto_Sans_Georgian({
    variable: '--noto-geo',
    subsets: ['georgian', 'latin', 'latin-ext'],
});

const inter = Inter({
    variable: '--inter',
    subsets: ['latin'],
});




const RootLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <html lang="en" className={`${notoGeoFont.variable} ${inter.variable}`}>
            <HeadAndMeta
                title="citadeli"
                description={`Vision of Company Citadeli is to establish high 
                standards of services and best quality products in the construction
                field; therefore aims to create a healthy competitive environment 
                in the building materials market.`}
                favIconImagePath="/images/meta/favicon.png"
                baseUrl="..."
                ogTitle="🔵"
                ogDescription=""
                ogImagePath="..."
            />
            <body>
                <Navigation />
                <div className="main_main">
                    {children}
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
