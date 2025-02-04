const config = {
  productionUrl:
  process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : "https://tmplate.xyz",
  layout: "stacked",
  branding: {
        logo_svg_path: null,
        show_brand_name: false,
        url: "/",
        brand_name: {
          name: "tmplate.xyz",
          font_family: "monospace",
          font_weight: "200"
        },
        company_type: ""
      },
          footer: {
            show_footer: true,
            show_social_icons: true,
            newsletter: true,
            logo: "/icon.webp",
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
      "twitter": "https://x.com/pprunty_",
      "strava": "https://www.strava.com/athletes/72636452",
      "github": "https://github.com/pprunty",
      "linkedin": "https://www.linkedin.com/in/patrickprunty/",
      "reddit": "",
      "tiktok": "",
      "instagram": "https://www.instagram.com/pprunty97/",
      "youtube": "https://www.youtube.com/@patrickprunty?sub_confirmation=1",
      "email": ""
    }
  }
};

export default config;