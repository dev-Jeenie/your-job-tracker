import { NextResponse } from "next/server";
import connectMongo from "../../lib/mongodb";
import { model, models, Schema } from "mongoose";
import { UrlItem } from "@/app/list/page";

const jobPostingSchema = new Schema<UrlItem>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  deadline: { type: Date },
  ogdata: {
    title: { type: String },
    description: { type: String },
    image: { type: String },
  },
});

const JobPosting = models.JobPosting || model("JobPosting", jobPostingSchema);

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
