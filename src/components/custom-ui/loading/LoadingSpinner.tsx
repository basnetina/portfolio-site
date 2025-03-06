import {Icon} from "@iconify/react";
import type React from "react";

const LoadingSpinner = () => {
    return (
        <>
            <div className="text-center text-gray-600 animate-bounce">
                <Icon icon={'eos-icons:loading'} className={'text-4xl'}/>
            </div>
        </>
    )
}

export default LoadingSpinner