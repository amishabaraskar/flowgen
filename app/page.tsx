import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import NavBar from "@/components/NavBar";
import Pricing from "@/components/pricing";
import Image from "next/image";
export default function Home() {
  return (
    <div className=" flex flex-col flex-1 items-center  justify-center text-black-800 bg-zinc-50 font-sans">
      <NavBar page="home" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob animation-delay-2000 absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-sky-400 opacity-30 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute top-[100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-400 opacity-25 blur-3xl" />
        <div className="animate-blob absolute bottom-[-80px] left-[30%] w-[350px] h-[350px] rounded-full bg-cyan-200 opacity-30 blur-3xl" />
      </div>

      <main className="flex flex-1 max-w-7xl flex-col items-center justify-between py-20 px-16  sm:items-start">
        <HeroSection />
        <HowItWorks />
        <Pricing />
      </main>
      <footer className="w-full h-24 flex items-center justify-center border-t">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FlowGen. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
