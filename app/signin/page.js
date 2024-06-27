
'use client';
import { sign } from 'crypto';
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from "next/navigation";

const SignIn = () => {
    const session = useSession();
    const router = useRouter();
    if (session.status === "loading") {
        return <p>Loading.....</p>
    }

    if (session.status === "authenticated") {
        router.push(`/sites`);
        // return <button onClick={() => signOut("google")}>LogOut</button>
    }

    if (session.status === "unauthenticated") {
        return <button className=' flex justify-center items-center w-[11.5rem] mt-[16rem] ml-[35rem] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 h-14' onClick={() => signIn("google")}>Login</button>

    }
    return (
        <div>
            <button onClick={() => signIn("google")}>Sign In with Google</button>
        </div>
    )
}

export default SignIn




