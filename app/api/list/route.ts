import { NextResponse } from "next/server";
import connectMongo from "../lib/mongodb";
import { Schema, model, models } from "mongoose";
import type { JobPosting } from "@/app/list/page";

const jobPostingSchema = new Schema<JobPosting>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  deadline: { type: Date,required: true },
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams",searchParams)
  const userEmail = searchParams.get('email');

  await connectMongo();
  const jobPostings = await JobPosting.find({userEmail});
  return NextResponse.json(jobPostings);
}

// 새로운 jobPosting 추가
export async function POST(request: Request) {
  await connectMongo();
  const { id, url, deadline, metadata, userEmail } = await request.json(); // 본문에서 userEmail 가져오기
  
  const newJobPosting = new JobPosting({
    id,
    url,
    deadline,
    userEmail,
    metadata,
  });
  await newJobPosting.save();
  return NextResponse.json(newJobPosting);
}
