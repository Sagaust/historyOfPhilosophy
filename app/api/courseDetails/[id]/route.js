import clientPromise from "../../../../lib/mongodb";

export async function GET(req) {
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("philosophy");

    const courseDetails = await db
      .collection("courseDetails")
      .find({ course_id: id })
      .toArray();

    return new Response(JSON.stringify(courseDetails), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
