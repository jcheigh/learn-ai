import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl?: string | null;
  description?: string | null;
  progress: number;
  category?: string | null;
  completedChapters: number;
  totalChapters: number;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  description,
  progress,
  category,
  completedChapters,
  totalChapters
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border bg-white transition hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl || "/course.jpg"}
            alt={title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col p-4">
          {category && (
            <div className="mb-2">
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {category}
              </span>
            </div>
          )}
          <h3 className="text-lg font-semibold leading-snug line-clamp-2">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between">
                <span>Progress</span>
                <span className="font-medium">
                  {completedChapters}/{totalChapters}
                </span>
              </div>
              <Progress 
                value={progress * 100} 
                className={cn(
                  "h-2",
                  progress === 1 ? "bg-emerald-100" : "bg-slate-100"
                )}
                indicatorClassName={cn(
                  progress === 1 ? "bg-emerald-600" : "bg-blue-600"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;