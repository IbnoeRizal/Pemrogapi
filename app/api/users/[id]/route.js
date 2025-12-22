import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET(request, {params}) {
//     const {id} = await params;
//     return Response.json({info: `anda mengakses id ${id}`});    
// }


//GET
export async function GET(request, {params}) {

    try{
        const resolvedParams = await params;
        if (isNaN(resolvedParams.id))
            return NextResponse.json({message: "id tidak valid"}, {status: 400});
        
        const id = parseInt(resolvedParams.id);  
         
        let user = await prisma.user.findUnique({
            where:{
                id: id,
            }
        });

        return NextResponse.json(user??{message:"user tidak ditemukan"},{status:user? 200 :404});
    }
    catch(error){
        console.error(`error : ${error}`)
        return NextResponse.json({message: "internal server error"},{status: 500});
    }
}


//put
export async function PUT(request, {params}) {
    try{
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id)
    
        const data = await request.json();
        const updateUser = await prisma.user.update({
            where : {id : id,},
            data :{
                name: data.name,
                email: data.email,
                password:data.password,
            }
        });

        return NextResponse.json(
            { 
                message:"User berhasil diupdate", 
                data: updateUser
            },
            {status:200}
        );

    }catch(error){
        console.error(`error : ${error}`)
        return NextResponse.json({message: "internal server error"},{status: 500});
    }
}

export async function DELETE(request,{params}) {
    try{
        const id = parseInt((await params).id);
        const deleted = await prisma.user.delete({
            where:{id:id}
        });
    
        return NextResponse.json(deleted??{message:"data tidak ditemukan"}, {status:deleted? 200:404});

    }catch (error){

        console.error(`error : ${error}`)
        return NextResponse.json({message: "internal server error"},{status: 500});
    }

}