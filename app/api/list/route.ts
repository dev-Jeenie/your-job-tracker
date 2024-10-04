import { NextResponse } from "next/server";
import connectMongo from "../lib/mongodb";
import { Schema, model, models } from "mongoose";
import type { JobPosting } from "@/app/list/page";
// import { getServerSession } from "next-auth";
// import { getSession, useSession } from "next-auth/react";
// import { authOptions } from "../lib/configs/auth/authOptions";

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
  // const session = await getServerSession(authOptions);
  // if(session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // console.log("userId",session?.user?.email)
  const { searchParams } = new URL(request.url);
  console.log("searchParams",searchParams)
  const userId = searchParams.get('email');

  await connectMongo();
  const jobPostings = await JobPosting.find({userId});
  return NextResponse.json(jobPostings);
}

// 새로운 jobPosting 추가
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams",searchParams)
  const userId = searchParams.get('email');

  // const session = await getServerSession(authOptions);
  // if(session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const { id, url, deadline, metadata } = (await request.json()) as JobPosting;
  
  const newJobPosting = new JobPosting({
    id,
    url,
    deadline,
    userId,
    metadata,
  });
  await newJobPosting.save();
  return NextResponse.json(newJobPosting);
}
