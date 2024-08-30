import { NextResponse } from "next/server";
import connectMongo from "../lib/mongodb";

import { Schema, model, models } from "mongoose";
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

export async function GET() {
  await connectMongo();
  const jobPostings = await JobPosting.find();
  return NextResponse.json(jobPostings);
}

// 새로운 jobPosting 추가
export async function POST(request: Request) {
  await connectMongo();
  const { id, url, deadline, ogdata } = (await request.json()) as UrlItem;

  console.log("POST", id, url, deadline, ogdata);

  const newJobPosting = new JobPosting({
    id,
    url,
    deadline,
    ogdata,
  });
  await newJobPosting.save();
  return NextResponse.json(newJobPosting);
}
