import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * @param {import("next/server").NextRequest req}
 */
export async function middleware(req) {

    const autHeader = req.headers.get("Authorization")
    
    if(!autHeader || !autHeader.startsWith("Bearer ")){
        return NextResponse.json({message: "Unauthorized: Token is missing"},{status: 401});
    }
    const token = autHeader.split(" ")[1];

    const tokenValidation = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)).then(x=>true).catch(e=>false);

    return tokenValidation? NextResponse.next() : NextResponse.json({message: "Unauthorized: invalid token"},{status:401})
}

export const config = {
    matcher:[
        "/api/products/:path*",
        "/api/users/:path*"
    ]
};