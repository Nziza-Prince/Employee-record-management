import dbConnect from "@/app/lib/mongodb";
import Record from "@/app/models/Record";
import { RecordSchema } from "@/utils/validation/form";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const record = await Record.findById(id);
    if (!record) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: record }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const body: RecordSchema = await req.json();
    const record = await Record.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    if (!record) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "DELETED Successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}