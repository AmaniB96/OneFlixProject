"use client";
import { useEffect, useState } from "react";
import SplashScreen from "../component/SplashScreen/SplashScreen";
import MainNav from "../component/mainnav/MainNav";
import SideNav from "../component/sidenav/SideNav";

export default function RootClientLayout({ children, geistSans, geistMono }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <body className={`${geistSans} ${geistMono} antialiased`}>
      {loading && <SplashScreen />}
      <MainNav />
      <SideNav />
      {children}
    </body>
  );
}