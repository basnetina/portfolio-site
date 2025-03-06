import Divider from "@/components/custom-ui/divider/Divider";
import AboutMe from "@/components/pages/home/AboutMe";
import {Download} from "lucide-react";
import SocialLinks from "@/components/pages/home/SocialLinks";
import AnimatedText from "@/components/pages/admin/cms/landing/AnimatedText";

async function getLandingData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/landing?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['landing'],
                revalidate: 0
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

}

export default async function LandingComponent() {
    const res = await getLandingData()
    const data = res?.cms_landing?.[0] || {}
    const animationText = data?.animation_texts?.split(",\n")

    return (
        <>
            <section id={'home'} className={"box-content size-48 pb-16 h-fit rounded w-full bg-white"}>
                <img src={data?.banner_image ?? '/home/banner.jpeg'} alt={'portfolio page'} className={'max-h-[25rem] w-full object-cover'}/>

                <div className={'rounded relative pt-10 md:pt-0 px-10 text-black dark:text-white'}>
                    <div>
                        <h2 className={"text-3xl font-semibold"}>
                            {data?.full_name || 'Prashant Adhikari'}
                        </h2>

                        <AnimatedText animationText={animationText} />

                        <div className={'flex items-center gap-2'}>
                            <span className={'text-sm text-gray-500'}>
                               {data?.address ?? 'Kathmandu, Bagmati, Nepal.'}
                            </span>
                            <a
                                href={`mailto:${data?.email}`}
                                className={"text-blue-500 hover:text-blue-600"}>
                                Email Me
                            </a>
                        </div>

                    </div>

                    <div
                        className="absolute top-[-40px] md:top-[-160px] left-[70px] md:left-[110px] transform -translate-x-1/2 w-20 h-20 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                        <img
                            src={data?.profile_pic ?? "/home/prashant.png"}
                            alt="profile pic"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <Divider/>

                    <div className={'mt-4 flex'}>
                        <div>
                            <AboutMe about={data?.about_me}/>
                        </div>
                    </div>

                    <div className={'flex items-center justify-between mt-4 pb-4'}>
                        <div>
                            <a download href={`/resume.pdf`}>
                                <button
                                    className={'bg-blue-950 py-2 gap-2 flex items-center text-white px-2 rounded text-sm'}>
                                <span className={'text-lg font-semibold'}><span
                                    className={'hidden md:inline'}>Download</span> Resume</span>
                                    <Download size={20}/>
                                </button>
                            </a>

                        </div>
                        <SocialLinks />
                    </div>

                </div>
            </section>
        </>
    )
}

