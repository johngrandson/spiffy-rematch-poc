import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=10&count=1"
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error fetching data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
