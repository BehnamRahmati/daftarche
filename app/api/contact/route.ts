import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    return NextResponse.json({message : "hi"})
}

export async function POST(req: NextRequest) {
    return NextResponse.json({message : "hi"})
}