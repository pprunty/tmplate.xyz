// _pages/main.tsx
import React from 'react';
import LayoutToggle from '../layout-toggle';
import { Admonition } from '@/app/_components/admonition';

export default function MainContent() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <Admonition type="warning" title="Important">
        This website is a front-end showcase and is not connected to a backend.
        As a result, form submissions and interactive features will not function
        as expected. The primary goal of this project is to demonstrate how the
        user experience dynamically adapts based on different layout selections.
      </Admonition>
      <section>
        <LayoutToggle />
      </section>
      <section>
        <h1 className="text-4xl font-bold mb-2">Welcome to My Website</h1>
        <p className="text-md text-base">
          This template application showcases Polymorphic Web Design Principles
          (PWDP). To read the full essay on what that is, you can see here.
          <br />
          <br />
          In short, Polymorphic Web Design abstracts the layout and navigation
          logic into configurable layouts and routes, via custom layouts and
          configurable routes.
          <br />
          <br />
          All the pages you see in this application are the same, however, the
          layout and navigation experience fundamentally changes based on the
          layout you select.
          <br />
          <br />
          These layouts are admin, social, stacked and basic. You can change the
          type of layout by selecting the dropdown below:
          <br />
          <br />
          By abstracting the layout and navigation experience, developers can
          focus on developing the components that provide the core value
          offering for the application they are seeking to build.
          <br />
          <br />
          To get started using this template, you can read the documentation and
          fork the repository here.
          <br />
          <br />
          In addition to offering the layout abstraction, this template also
          provides support for automating site SEO, branding and light/dark mode
          theming.
          <br />
          <br />
          Note:
          <br />
          - `admin` layout is based loosely off vercel.com
          <br />
          - `social` layout is based loosely off threads.net
          <br />
          - `stacked` layout is based loosely off Spotify
          <br />- `basic` layout is based off most basic website layouts
        </p>
      </section>
    </div>
  );
}
