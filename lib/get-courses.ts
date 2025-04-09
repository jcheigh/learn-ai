import { prisma } from "@/lib/prisma";

export async function getCourses(userId?: string) {
  try {
    // Get all published modules (courses)
    const courses = await prisma.module.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
          include: {
            userProgress: {
              where: {
                userId: userId || "",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data for better consumption by components
    const coursesWithProgress = courses.map((course) => {
      const completedChapters = course.chapters.filter((chapter) => {
        return chapter.userProgress?.[0]?.isCompleted || false;
      });

      return {
        ...course,
        progress: completedChapters.length / course.chapters.length,
        completedChapters: completedChapters.length,
        totalChapters: course.chapters.length,
      };
    });

    return coursesWithProgress;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
}

export async function getCourseById(courseId: string, userId?: string) {
  try {
    const course = await prisma.module.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
          include: {
            userProgress: {
              where: {
                userId: userId || "",
              },
            },
          },
        },
      },
    });

    if (!course) {
      return null;
    }

    const completedChapters = course.chapters.filter((chapter) => {
      return chapter.userProgress?.[0]?.isCompleted || false;
    });

    return {
      ...course,
      progress: completedChapters.length / course.chapters.length,
      completedChapters: completedChapters.length,
      totalChapters: course.chapters.length,
    };
  } catch (error) {
    console.error("[GET_COURSE]", error);
    return null;
  }
}