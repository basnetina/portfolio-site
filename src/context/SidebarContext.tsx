"use client"
import {createContext, ReactNode, useContext, useState} from "react";

interface SidebarContextProps{
    showSidebar: boolean,
    toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const SidebarProvider = ({children}: {children: ReactNode}) => {
    const [showSidebar, setShowSidebar] = useState(false)

    const values = {
        showSidebar,
        toggleSidebar: () => setShowSidebar(!showSidebar)
    }
    return (
        <SidebarContext.Provider value={values}>
            {children}
        </SidebarContext.Provider>
    )
}


export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
