import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { userId }: any = getAuth(request);
    const { time, difficulty, language } = await request.json();
    let template;
    if (language == "typescript") {
      template = "react-ts";
    } else if (language == "javascript") {
      template = "vanilla";
    } else {
      template = language;
    }
    const rooms = await prisma.room.findMany({
      where: {
        ...(time && { time }),
        ...(difficulty && { difficulty }),
        ...(language && { template }),
      },
    });
    let emptyRoom;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].players.length !== 2) {
        emptyRoom = rooms[i];
        break;
      }
    }
    if (!emptyRoom) {
      const newRoom = await prisma.room.create({
        data: { difficulty, time, template, players: [userId] },
      });
      return Response.json({
        success: true,
        message: "New Room has been created and you have been added to it",
        room: newRoom,
      });
    }
    if (emptyRoom.players.includes(userId)) {
      return Response.json({
        success: true,
        message: "You are already in a room",
        room: emptyRoom,
      });
    }
    if (emptyRoom.players.length === 1) {
      const updatedRoom = await prisma.room.update({
        where: { id: emptyRoom.id },
        data: { players: [...emptyRoom.players, userId] },
      });
      return Response.json({
        success: true,
        message: "You have been added to an existing room",
        room: updatedRoom,
      });
    }

    return Response.json({
      success: false,
      message: "Some Problem occurred",
    });
  } catch (error: Error | any) {
    console.log(error);
    return Response.json({
      success: false,
      message: "A server error occurred",
    });
  }
};
