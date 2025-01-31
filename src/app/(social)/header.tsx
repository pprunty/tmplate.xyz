import CTA from "@/app/_layout/cta";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        left-0
        w-full
        z-50
        py-4
        sm:py-4
        flex
        items-center
        justify-center
        dark:bg-[#171717]/50
        backdrop-blur-lg
        sm:bg-primary-background-light/85 sm:dark:bg-[#171717]/85
        border-b dark:border-[#333] border-[#EAEAEA]
        sm:border-0
      "
    >
      <div className="relative w-full flex flex-col">
        {/* Center Home on Desktop */}
        <div className="hidden sm:flex w-full justify-center">
          <h3 className="text-md font-semibold dark:text-white">Home</h3>
        </div>

        {/* CTA on mobile (above content) (hidden on md+) */}
        <div className="sm:hidden px-2">
          <CTA options={["auth"]} />
        </div>
      </div>
    </header>
  );
}
