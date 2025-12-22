import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {z} from "zod";
import bcrypt from "bcryptjs";

const UserSchema = z.object({
  name: z.string().min(3, {message: "Nama minimal harus tiga karakter"}),
  email: z.email({message: "Format email tidak valid"}),
  password: z.string().min(8,{message: "password minimal 8 karakter"})
});

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  try {
    const dat = await request.json();
    const validation = UserSchema.safeParse(dat);

    if (!validation.success)
        return NextResponse.json(
        {
          error: z.flattenError(validation.error)
        },
        {status:400}
      )

    const freshUser = await prisma.user.create({
      data: {
        name: dat.name,
        email: dat.email,
        password: await bcrypt.hash(dat.password, 10),
      },
    });

    return NextResponse.json(freshUser);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `couldn't create new user` },
      { status: 500 },
    );
  }
}
