import CTA from "@/app/_layout/cta";
import Logo from "../logo";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        left-0
        w-full
        z-[50]
        pt-2 pb-3
        sm:py-4
        flex
        items-center
        justify-center
        sm:dark:bg-[#0D0D0D] sm:bg-[#FCFCFC]
        backdrop-blur-xl
        bg-primary-background-light/70 dark:bg-[#171717]/70
        border-b dark:border-[#333] border-[#EAEAEA]
        sm:border-0
      "
     >
           <div className="relative w-full flex flex-col">
             {/* Center Home on Desktop */}
             <div className="hidden sm:flex w-full justify-center">
               <h3 className="text-md font-semibold dark:text-white">Home</h3>
             </div>

             {/* Logo + CTA on Mobile (Hidden on md+) */}
             <div className="sm:hidden px-2 flex flex-col items-center w-full">
               <Logo className="" /> {/* Centered logo */}
               <div className="w-full">
                 <CTA options={["auth"]} /> {/* Full-width CTA */}
               </div>
             </div>
           </div>
         </header>
  );
}
