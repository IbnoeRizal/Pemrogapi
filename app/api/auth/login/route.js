import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request) {
    const {email, password} = await request.json();
    
    const user = await prisma.user.findUnique({
        where:{
            email: email,
        },
        select:{
            id: true,
            password: true,
            email: true
        }
    });
    
    if(!user)
        return NextResponse.json({message: "invalid credential"}, {status: 401});

    return bcrypt.compare(password, user.password).then( async x => {
        if(!x)
            return NextResponse.json({message: "invalid credential"},{status:401});
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            id: user.id,
            email: user.email,
        }).setProtectedHeader({alg:"HS256"}).setExpirationTime("2 hr").sign(secret);

        return NextResponse.json({message:"Login success", token})
    }).catch( x =>{
        console.log(x);
        return NextResponse.json({message:"internal server error"},{status:500});
    })

}