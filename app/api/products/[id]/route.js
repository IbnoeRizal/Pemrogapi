import { NextResponse } from "next/server";
import { prisma, Prisma } from "@/lib/prisma";
import { disconnect } from "process";

export async function POST(request,{params}) {
    try{
        const id = parseInt((await params).id);
        const data = await request.json();

        let updateData = {
            name:data.name,
            prisce: data.price,
            stock: data.stock
        };

        if (data.hapusKategori){
            updateData.category = {
                disconnect: true
            };
        }else if(data.categoryId){
            updateData.category = {
                connect: true
            };
        }

        const updateProduct = prisma.product.update({
            where:{id:id},
            data:updateData,
            include:{
                category: true
            }
        });
        
        return NextResponse.json(
            {
                message: "update data berhasil",
                data: updateProduct,
            },
            {status:200}
        );
    }catch(e){
        console.log(e);
        return NextResponse.json({message:"internal server error"},{status:500})
    }    
}