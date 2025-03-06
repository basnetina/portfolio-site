"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface HexSkillProps {
    name: string
    level: number
    color: string
}

const HexSkill: React.FC<HexSkillProps> = ({ name, level, color }) => {
    return (
        <motion.div
            className="hex-skill"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1.1 }}
            transition={{ duration: 0.5 }}
        >
            <svg viewBox="0 0 100 100" className="hex">
                <polygon
                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                    fill={color}
                    stroke="#000"
                    strokeWidth="2"
                />
                <text x="50" y="40" textAnchor="middle" fill="#fff" fontSize="10">
                    {name}
                </text>
                <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
                    {level}%
                </text>
            </svg>
        </motion.div>
    )
}

export default HexSkill
