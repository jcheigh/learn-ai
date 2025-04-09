import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

function isAdmin(userId: string | null) {
  return userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
}

export async function PATCH(
  request: Request,
  { params }: { params: { chapterId: string, moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const chapterId = params.chapterId;
    const { publish } = await request.json();

    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: { isPublished: publish },
    });

    return NextResponse.json(updatedChapter);
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
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const chapterId = params.chapterId;

    const deleted = await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
