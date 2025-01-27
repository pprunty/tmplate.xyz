
---

primary routes: Home (don't show on basic/use logo), Search (only on social)
secondary routes: 
other routes: Privacy Policy,
nested routes: Home -> (), Search -> null

1. admin

desktop: sidebar (shows primary routes) with header that shows secondary routes and CTA

mobile: sticky header with CTA and menu (Nextra)

2. social

desktop: narrow container, header with CTA at the top (optional secondary routes?), main content, optional footer (threads.net)

mobile: responsive scroll header with CTA (optional secondary routes?), main content, bottom bar and optional footer

3. basic

desktop: wide container, sticky header showing primary routes () with blur, CTA, footer

mobile: 

4. stacked 

desktop: wide container, sticky stacked and responsive header like in Vercel, optional footer

mobile: stacked header


- [ ] Add responsive mobile design for Admin Sidebar
  - [ ] Create stacked header in sidebar menu with nested route bar
  - [ ] Add primary, secondary keys in routes 
  - [ ] Add overwrite for showing route `show_route: true | false`
- [ ] Create basic layout type with primary routes 
- [ ] Create CTA component which is configurable in code, not in config and used in each `header.tsx`

for chatgpt:

1. How do I create an admin layout (desktop.tsx, mobile.tsx, index.tsx and header.tsx) using this Sidebar by modularizing
it into header.tsx, desktop.tsx and mobile.tsx with an index.tsx file which uses this middleware to show mobile/desktop menu.
2. How do I similarly create a basic layout (desktop.tsx, mobile.tsx, index.tsx and header.tsx) which uses a 
sticky header, main content and the same shared footer from the admin layout using the routes from this routes.tsx similar
to the admin layout. the header.tsx should be shared, used by both mobile and desktop and therefore responsive for different 
screens
3. How in this root layout.tsx, do i create a master layout component which reads from the config the type of layout to 
render (admin or basic)
4. how for this admin header and this basic header do i create a CTA component which both share and display on the right 
hand side


```js
const config = {
  productionUrl:
  process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : "https://tmplate.xyz",
  layout: "admin | social | basic | stacked",
  branding: 
    logo_svg_path: null,
    show_brand_name: false,
    url: "/",
    brand_name: {
        name: "[tmp]",
        font_family: "monospace",
        font_weight: "200"
    },
    company_type: "Corp."
  },
  header: {
    cta: {
      options: ["auth", "notifications"]
    }
  },
  footer: {
    show_footer; true,
    show_social_icons: true,
    logo: "/assets/images/dice.gif",
    mobile_app: {
      show_ios: true,
      ios_url: "https://apps.apple.com/app/id123456789",
      show_android: false,
      android_url: "https://play.google.com/store/apps/details?id=com.example.app"
    }
  },
  analytics: {
    gaMeasurementId: "",
    useVercelAnalytics: true
  },
  seo: {
    title: "tmplate.xyz — Pure Web Design",
    description: "Pure Web Design",
    publisher: {
      name: "Patrick Prunty",
      logo: "/icon.webp"
    },
    bio: "high-performance, customisable nextjs blog template",
    keywords: [
      "blog.v2",
      "nextjs",
      "digital blog",
      "open source",
      "web development",
      "ui/ux",
      "high-performance",
      "patrick prunty",
      "minimalistic"
    ],
    socials: {
      twitter: "https://patrickprunty.com",
      strava: "https://www.strava.com/athletes/72636452",
      github: "https://github.com/pprunty/blog.v2",
      linkedin: "",
      reddit: "",
      tiktok: "https://patrickprunty.com",
      instagram: "",
      youtube: "https://patrickprunty.com",
      email: ""
    }
  }
};
```

