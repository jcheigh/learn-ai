import CourseCard from "@/components/dashboard/course-card";

interface CoursesProps {
  courses: Array<{
    id: string;
    title: string;
    imageUrl?: string | null;
    description?: string | null;
    progress: number;
    category?: { name: string } | null;
    completedChapters: number;
    totalChapters: number;
  }>;
}

const Courses = ({ courses }: CoursesProps) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-12">
        <h2 className="text-2xl font-semibold text-slate-700">
          No courses found
        </h2>
        <p className="text-center text-slate-500">
          We couldn&apos;t find any courses right now. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">All Courses</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl}
            description={course.description}
            progress={course.progress}
            category={course.category?.name || null}
            completedChapters={course.completedChapters}
            totalChapters={course.totalChapters}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
