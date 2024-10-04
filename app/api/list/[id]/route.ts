import { NextResponse } from "next/server";
import connectMongo from "../../lib/mongodb";
import { model, models, Schema } from "mongoose";
import type { JobPosting } from "@/app/list/page";

const jobPostingSchema = new Schema<JobPosting>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  deadline: { type: Date },
  userEmail: { type: String, required: true },
  metadata: {
    title: { type: String },
    description: { type: String },
    og: {
      image: { type: String },
    },
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
