import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Record from '../../models/Record';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const records = await Record.find({});
    return NextResponse.json({ success: true, data: records },{status:200});
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const record = await Record.create(body);
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}