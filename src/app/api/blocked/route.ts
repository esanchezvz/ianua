import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ message: "You've been blocked" }, { status: 429 })
}
