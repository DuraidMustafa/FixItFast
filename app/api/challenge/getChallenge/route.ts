import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const difficulty = searchParams.get("difficulty") ?? undefined;
    const language = searchParams.get("language") ?? undefined;
    const challenges = await prisma.challenge.findMany({
      where: {
        ...(difficulty && { difficulty }),
        ...(language && { template: language }),
      },
    });
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    console.log(challenge);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Challenge fetched successfully",
        challenge,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Server Error Occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
