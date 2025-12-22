import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const category = prisma.category.findMany();
        return NextResponse.json(category)    
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "internal server error"},{status:500});
    }
}

export async function POST(request) {
    
    try{
        const data = await request.json();
        const category = await prisma.category.create({
            data:{
                category: data.category,
            }
        });
        return NextResponse.json(category);
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "internal server error"},{status:500})
    }
}