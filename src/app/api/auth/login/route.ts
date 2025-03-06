import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {auth} from "@/firebase/firebase";

export async function POST(request: NextRequestWithAuth) {
    try {
        const {email, password} = await request.json();
        if (email.length === 0) return NextResponse.json({ error: 'please type email to proceed!' })
        if (password.length === 0) return NextResponse.json({ error: 'please type password to proceed!' })
        const userCred= await signInWithEmailAndPassword(auth, email, password);
        const user = userCred?.user;
        return NextResponse.json({message: 'successfully logged in with email and password', status: 'SUCCESS', data: user})
    } catch (error) {
        return NextResponse.json({ error: `${error}` })
    }
}