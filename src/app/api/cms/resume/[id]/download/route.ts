import {NextRequest} from "next/server";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/firebase/firebase";

type slugParams = {
    params: Promise<{
        id: string,
    }>
}

export async function GET(req: NextRequest,{ params }: slugParams){
    try {
        const id = (await params).id
        const docRef = doc(db, "cms_resume", "yAmICzdEpchjeHoErhBL")

        const querySnapshot = await getDoc(docRef);
        let tempArr = null

        if (querySnapshot.exists()) {
            tempArr = querySnapshot.data()
        } else {
            return Response.json({ message: 'No such resume content!' + id, status: "FAILURE"})
        }
        console.log(tempArr)

        const pdfBlob = new Blob([tempArr?.file], { type: 'application/pdf' });
        const pdfBuffer = await pdfBlob.arrayBuffer();

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
                'Access-Control-Expose-Headers': 'Content-Disposition',
            },
        });
    } catch (err) {
        return new Response("Error fetching projects", { status: 500 })
    }
}