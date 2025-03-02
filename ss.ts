import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export  function middleware(req: NextRequest) {
	const session =  getServerSession(authOptions);
	console.log(session);

	if (!session && req.nextUrl.pathname !== "/") {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// Allow the request to continue normally
	return NextResponse.next();
}

// See the "Matching Paths" section below to learn more
export const config = {
	matcher: "/daftarche", // applies only to paths starting with /protected-route
};
