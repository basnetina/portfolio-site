"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const RouterEventsProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        const timeout = setTimeout(() => NProgress.done(), 800);
        return () => clearTimeout(timeout);
    }, [pathname]);

    return <>{children}</>;
};

export default RouterEventsProvider;
