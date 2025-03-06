import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";
import { v2 as cloudinary } from 'cloudinary'


export async function POST(req: NextRequest){
    try {
        const session = await getServerSession()
        if(!session){
            return Response.json({
                status: 'FAILURE',
                message:  "Please login to access this endpoint."
            })
        }

        const requestData = await req.json();

        cloudinary.config({
            cloud_name: 'dqq3htqpl',
            api_key: '821954547113484',
            api_secret: process.env.CLOUDINARY_SECRET
        });

        const gone = await cloudinary.uploader
            .upload(
                requestData?.image
            )
            .catch((error) => {
                console.log(error);
            });

        console.log('again', gone)


        return Response.json({
            status: 'SUCCESS',
            message: 'Successfully uploaded the image!',
        })
    } catch (e) {
        return Response.json({
            status: 'FAILURE',
            message: (e as Error).message,
        })
    }
}
