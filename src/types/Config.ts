export interface Config {
  productionUrl: string;
  layout: {
    show_branding: boolean;
    show_footer: boolean;
    show_cta: boolean;
    desktop: {
      show_cta: boolean;
      show_footer: boolean;
      show_branding: boolean;
      type: "StandardHeader" | "StickyHeader" | "Narrow" | "SidebarMenu";
      variation: string;
      header: {
        cta: {
          options: string[];
        };
      };
      branding: {
        show_brand_name: boolean;
      };
    };
    mobile: {
      type: "HamburgerMenu" | "StickyHeader" | "StandardHeader" | "BottomBar";
      variation: string;
      header: {
        variation: string;
      };
      cta: {
        options: string[];
      };
      show_footer: boolean;
      show_branding: boolean;
    };
    header: {
      variation: string;
    };
    cta: {
      options: string[];
    };
    footer: {
      show_social_icons: boolean;
      newsletter: boolean;
      logo: string;
      mobile_app: {
        show_ios: boolean;
        ios_url: string;
        show_android: boolean;
        android_url: string;
      };
    };
    branding: {
      logo_svg_path: string | null;
      show_brand_name: boolean;
      url: string;
      brand_name: {
        name: string;
        font_family: string;
        font_weight: string;
      };
      company_type: string;
    };
  };
  routing: {
    primary: Record<string, unknown>;
    secondary: Record<string, unknown>;
    admin: Record<string, unknown>;
  };
  analytics: {
    gaMeasurementId: string;
    useVercelAnalytics: boolean;
  };
  seo: {
    title: string;
    description: string;
    publisher: {
      name: string;
      logo: string;
    };
    bio: string;
    keywords: string[];
    socials: {
      twitter: string;
      strava: string;
      github: string;
      linkedin: string;
      reddit: string;
      tiktok: string;
      instagram: string;
      youtube: string;
      email: string;
    };
    blog: {
      posts_path: string;
      is_blog_user_configured: boolean;
    };
  };
}
