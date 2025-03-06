'use client'

import { useEffect, useRef } from 'react'

import Prism from 'prismjs'
import './prism-theme.css'

import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'


interface SimpleContentRendererProps {
    content: string
    className?: string
}

export default function SimpleContentRenderer({ content, className = '' }: SimpleContentRendererProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!contentRef.current) return

        const images = contentRef.current.querySelectorAll('img')
        images.forEach(img => {
            img.classList.add('rounded-md', 'my-4', 'max-w-full', 'h-auto')

            if (img.parentElement?.tagName !== 'FIGURE') {
                const figure = document.createElement('figure')
                figure.classList.add('my-8')
                img.parentNode?.insertBefore(figure, img)
                figure.appendChild(img)

                if (img.alt && !img.nextElementSibling?.classList.contains('caption')) {
                    const caption = document.createElement('figcaption')
                    caption.classList.add('text-center', 'text-sm', 'text-gray-500', 'mt-2')
                    caption.textContent = img.alt
                    figure.appendChild(caption)
                }
            }
        })

        // Process code blocks
        const codeBlocks = contentRef.current.querySelectorAll('pre')
        codeBlocks.forEach((code) => {
            if (code.className) {
                const wrapper = document.createElement('div')
                wrapper.className = 'code language-java rounded-md overflow-hidden my-4'

                code.parentNode?.replaceChild(wrapper, code)
                wrapper.appendChild(code)

                const lang = code.className.match(/language-(\w+)/)?.[1]
                if (lang) {
                    wrapper.classList.add(`language-${lang}`)
                }
                Prism.highlightElement(code)

            }
        })

        // Process tables
        const tables = contentRef.current.querySelectorAll('table')
        tables.forEach(table => {
            // Create a wrapper for horizontal scrolling
            const wrapper = document.createElement('div')
            wrapper.classList.add('overflow-x-auto', 'my-8')
            table.parentNode?.insertBefore(wrapper, table)
            wrapper.appendChild(table)

            table.classList.add('min-w-full', 'divide-y', 'divide-gray-200', 'dark:divide-gray-700')
        })

        const iframes = contentRef.current.querySelectorAll('iframe')
        iframes.forEach(iframe => {
            const wrapper = document.createElement('div')
            wrapper.classList.add('relative', 'overflow-hidden', 'w-full', 'pt-[56.25%]', 'my-8') // 16:9 aspect ratio
            iframe.parentNode?.insertBefore(wrapper, iframe)
            wrapper.appendChild(iframe)

            iframe.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'border-0')
        })

    }, [])

    return (
        <div
            ref={contentRef}
            className={`blog-content ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
