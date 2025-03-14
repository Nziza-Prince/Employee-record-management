import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Record from '../../models/Record';
import { RecordSchema } from '@/utils/validation/form';

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
    const body:RecordSchema = await req.json();

    const existingUser = await Record.findOne({email:body.email})
    
    if(existingUser){
      return NextResponse.json({success:false,error:"Record Already exists"},{status:400})
    }
    const record = await Record.create(body);
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}