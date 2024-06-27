"use client";

import Navbar from "./Header/page";
import SideMenu from "./Home/page";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

import React from 'react';

const ClientLayout = ({ children }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/signin');
        }
    }, [status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: "flex", margin: 0, height: "100vh" }}>
            {status === "authenticated" && (
                <aside style={{ borderRight: "1px solid #ddd" }}>
                    <SideMenu />
                </aside>
            )}
            <main style={{ width: status === "authenticated" ? "80%" : "100%", marginRight: status === "authenticated" ? "43vh" : "0" }}>
                <Navbar />
                <div style={{ padding: "16px" }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;
