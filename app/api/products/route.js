import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    select:{
      category:true
    }
  });
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const dat = await request.json();
    const nwproduct = await prisma.product.create({
      data: {
        name: dat.name,
        price: dat.price,
        stock: dat.stock,
        category:{
          connect: {
            id : parseInt(dat.categoryId),
          }
        }
      },
    });

    return NextResponse.json(nwproduct);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: `couldn't create new product` },
      { status: 500 },
    );
  }
}
