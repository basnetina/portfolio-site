
export const menuItems = [
    {
        title: "Dashboard",
        icon: "tabler:layout-dashboard",
        path: "/admin/dashboard",
    },
    {
        title: "CMS",
        icon: "iconoir:page",
        submenu: [
            {
                title: "LANDING PAGE",
                path: "/admin/content",
            },
            {
                title: "SKILLS PAGE",
                path: "/admin/content/skills",
            },
            {
                title: "CONTACT PAGE",
                path: "/admin/content/contacts",
            },
        ],
    },
    {
        title: "Project Management",
        icon: "icon-park-outline:ad-product",
        submenu: [
            {
                title: "PROJECTS",
                path: "/admin/projects",
            },
            {
                title: "ADD PROJECT",
                path: "/admin/projects/add",
            },
            {
                title: "PROJECT TAGS",
                path: "/admin/projects/tags",
            },
        ],
    },
    {
        title: "Education Management",
        icon: "icon-park-outline:ad-product",
        submenu: [
            {
                title: "EDUCATION",
                path: "/admin/education",
            },
            {
                title: "ADD EDUCATION",
                path: "/admin/education/add",
            }
        ],
    },
    {
        title: "Blogs Management",
        icon: "fa-solid:blog",
        submenu: [
            {
                title: "BLOGs",
                path: "/admin/blogs",
            },
            {
                title: "ADD BLOG",
                path: "/admin/blogs/add",
            }
        ],
    },
    {
        title: "Contacts",
        icon: "lucide:contact-round",
        path: "/admin/contact",
    },
    {
        title: "Settings",
        icon: "material-symbols:settings-outline-rounded",
        path: "/admin/settings",
    },
    {
        title: "Back to Home",
        icon: "icon-park-outline:back",
        path: "/",
    }
]