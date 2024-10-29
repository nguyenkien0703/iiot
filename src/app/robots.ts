import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
    return {
        // cach nhan bien robots tu 1 website, vis du tiki https://tiki.vn/robots.txt
        rules: {
            userAgent: '*',
            allow: '/',
            // disallow: ['/'],
        },
        // sitemap: 'https://'
    }

}