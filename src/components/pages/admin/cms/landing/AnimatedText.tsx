"use client"

import { TypeAnimation } from "react-type-animation"
import type React from "react" // Added import for React

interface AnimatedTextProps {
    animationText: string[]
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ animationText }) => {
    if (animationText?.length > 0) {
        return (
            <TypeAnimation
                sequence={[animationText[0], 1000, animationText[1], 1000, animationText[2], 1000]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "0.85rem", display: "inline-block" }}
                repeat={Number.POSITIVE_INFINITY}
            />
        )
    }
    return null
}

export default AnimatedText

