import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(
  request: Request,
  { params }: { params: { chapterId: string, moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const chapterId = params.chapterId;
    const { isCompleted } = await request.json();

    // Check if the user progress record already exists
    const existingUserProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    if (existingUserProgress) {
      // Update existing record
      const updated = await prisma.userProgress.update({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
        data: {
          isCompleted,
        },
      });

      return NextResponse.json(updated);
    } else {
      // Create new record
      const created = await prisma.userProgress.create({
        data: {
          userId,
          chapterId,
          isCompleted,
        },
      });

      return NextResponse.json(created);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { chapterId: string, moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const chapterId = params.chapterId;

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return NextResponse.json(userProgress || { isCompleted: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { chapterId: string, moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const chapterId = params.chapterId;

    const deleted = await prisma.userProgress.delete({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}