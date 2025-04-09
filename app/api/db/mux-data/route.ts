import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

function isAdmin(userId: string | null) {
  return userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { muxDataList } = await request.json();

    if (!Array.isArray(muxDataList)) {
      return NextResponse.json(
        { error: 'muxDataList must be an array' },
        { status: 400 }
      );
    }

    const created = await prisma.muxData.createMany({
      data: muxDataList,
    });

    return NextResponse.json(created);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      );
    }

    const deleted = await prisma.muxData.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
