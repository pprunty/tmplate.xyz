import { ThemeSwitcher } from "./_components/theme-switcher";
import LayoutToggle from "./_components/layout-toggle";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <section>
        <h1 className="text-4xl font-bold mb-2">Welcome to My Website</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
         This template application showcases Polymorphic Web Design Principles (PWDP). To read the full essay on what that
         is, you can see here.

         In short, Polymorphic Web Design abstracts the layout and navigation logic into configurable layouts and routes, via
         custom layouts and configurable routes.

         All the pages you see in this application are the same, however, the layout and navigation experience fundamentally changes
         based on the layout you select.

         These layouts are admin, social, stacked and basic. You can change the type of layout by selecting the dropdown below:

         By abstracting the layout and navigation experience, developers can focus on developing the components that provide the
         core value offering for the application they are seeking to build.

         To get started using this template, you can read the documentation and fork the repository here.

         In addition to offering the layout abstraction, this template also provides support for automating site SEO,
         branding and light/dark mode theming.

         Note:

         - `admin` layout is based losoely off vercel.com
         - `social` layout is based loosely off threads.net
         - `stacked` layout is based loosely off Spotify
         - `basic` layout is based off most basic website layouts
        </p>
      </section>

 <section>
        <LayoutToggle />
      </section>

      {/* Theme Switcher */}
      <section>
        <ThemeSwitcher />
      </section>
    </div>
  );
}
