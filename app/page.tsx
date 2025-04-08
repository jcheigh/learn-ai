import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import Courses from "@/components/dashboard/courses";
import Footer from "@/components/dashboard/footer";

export default async function Home() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const userName = user?.firstName || "User";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[80px] fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-40 pt-[80px] pb-[60px]">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] pb-[60px] flex-grow">
        <Header userName={userName} />
        <Courses />
      </main>
      <div className="h-[60px] fixed inset-x-0 bottom-0 md:pl-56 z-40">
        <Footer />
      </div>
    </div>
  );
}