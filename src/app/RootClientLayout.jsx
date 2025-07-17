"use client";
import { useEffect, useState } from "react";
import SplashScreen from "../component/SplashScreen/SplashScreen";
import MainNav from "../component/mainnav/MainNav";
import SideNav from "../component/sidenav/SideNav";
import Footer from "../component/footer/Footer"
import { usePathname } from 'next/navigation'
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast'; 



export default function RootClientLayout({ children, geistSans, geistMono, geistManrope }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();

  const hideSideNav = pathname.startsWith('/features/auth');

  return (
    <SessionProvider>
    <body className={`${geistSans} ${geistMono} ${geistManrope} antialiased`}>
      {loading && <SplashScreen />}
      <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#363636',
                        color: '#fff',
                        border: '1px solid #555'
                    },
                    success: {
                        iconTheme: {
                            primary: '#FAC402',
                            secondary: '#363636',
                        },
                    },
                }}
                containerStyle={{
                  top: 100,      
                  zIndex: 100001 
                }}
            />
      <MainNav />
      {!hideSideNav && <SideNav />}
      {children}
      <Footer/>
    </body>
    </SessionProvider>
  );
}