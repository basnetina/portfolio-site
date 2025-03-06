
import { writeFile } from "fs/promises"
import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = file.name

    if(file.type !== "application/pdf"){
        return NextResponse.json({ success: false, message: "Invalid file type. Only PDF files are allowed." }, { status: 400 })
    }

    const publicPath = path.join(process.cwd(), "public", "resume.pdf")

    try {
        await writeFile(publicPath, buffer)
        console.log(`File saved to ${publicPath}`)

        const fileUrl = `/${filename}`

        return NextResponse.json({status: 'SUCCESS', success: true, message: "File uploaded successfully", url: fileUrl })
    } catch (error) {
        console.error("Error while saving the file:", error)
        return NextResponse.json({status: 'FAILURE', success: false, message: "Failed to save the file" }, { status: 500 })
    }
}
