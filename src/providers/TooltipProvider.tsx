"use client"

import {ReactNode} from "react";
import { TooltipProvider } from '@/components/ui/tooltip'

export const ToolProvider = ({children}:{children: ReactNode}) => {
    return (
        <TooltipProvider>
            {children}
        </TooltipProvider>
    )
}