import { NextResponse } from "next/server";
import connectMongo from "../../lib/mongodb";
import { JobPosting } from "../route";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectMongo();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedItem = await JobPosting.findOneAndDelete({ id });

  if (!deletedItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Item deleted successfully",
    deletedItem,
  });
}
