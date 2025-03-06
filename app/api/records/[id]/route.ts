// app/api/records/route.ts
import dbConnect from "@/app/lib/mongodb";
import Record from "@/app/models/Record";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const record = await Record.findById(params.id);
    if (!record) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: record }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const record = await Record.findByIdAndUpdate(
      params.id,
      body, // Replace the entire document with the new body
      {
        new: true, // Return the updated document
        runValidators: true, // Validate all fields
        overwrite: true, // Ensure full replacement
      }
    );
    if (!record) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const deleteRecord = await Record.findByIdAndDelete(params.id);
    if (!deleteRecord) {
      return NextResponse.json({ success: false, error: 'Record not Found' }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}