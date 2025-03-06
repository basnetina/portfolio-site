import path from "node:path";
const __dirname = path.resolve();

const nextConfig = {
    compiler: {
        removeConsole: process.env.NEXT_PUBLIC_ENVIRONMENT !== "STAGING"
    },
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "images.unsplash.com",
            "fakeimg.pl",
            "res.cloudinary.com"
        ]
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
};


export default nextConfig;
