import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

function isAdmin(userId: string | null) {
  return userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
}

export async function PATCH(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const moduleId = params.moduleId;
    const { publish, publishAllChapters } = await request.json();
   
    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data: {
        isPublished: publish,
      },
    });

    if (publishAllChapters) {
      await prisma.chapter.updateMany({
        where: { moduleId },
        data: { isPublished: publish },
      });
    }

    return NextResponse.json(updatedModule);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const moduleId = params.moduleId;

    const deleted = await prisma.module.delete({
      where: { id: moduleId },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
