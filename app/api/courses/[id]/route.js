// app/api/courses/[id]/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db("philosophy");
  const { id } = params;

  try {
    const courseDetails = await db
      .collection("courseDetails")
      .findOne({ course_id: parseInt(id) }); // Ensure the id is parsed as an integer
    if (!courseDetails) {
      return NextResponse.json(
        { error: "Course details not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(courseDetails);
  } catch (error) {
    console.error("Failed to fetch course details:", error);
    return NextResponse.json(
      { error: "Failed to fetch course details" },
      { status: 500 },
    );
  }
}
