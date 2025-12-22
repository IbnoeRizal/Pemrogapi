import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try{
        const { name, email, password} = await request.json();

        const hashPas = await bcrypt.hash(password, 10);
        const freshUser = prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashPas,
            }
        });

        return NextResponse.json(
            {message: "user baru berhasil dibuat"},
            {status:200}
        );
    }catch(e){
        console.log(`Error User : ${e}`);
        return NextResponse.json({message:"internal server error"},{status:500});

    }
}
