'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from "next/navigation";

const AuthenticatedLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        router.push(`/signin`);
    }

    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default AuthenticatedLayout;
