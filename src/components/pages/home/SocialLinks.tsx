import {Icon} from "@iconify/react";
import {SocialType} from "@/types/socialType";
import {socialOptions} from "@/lib/socialIconData";

async function getSocialLinks() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/social?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['social']
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

export default async function SocialLinks ({color}: {color?: null | string }){
    const res = await getSocialLinks()
    const data = res?.cms_social?.[0] || {}
    return (
        <div className="flex mt-4 space-x-4">
            {data?.socialLinks?.map((item: SocialType, index: number) =>  <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={'hover:text-opacity-50'}
            >
                <Icon icon={socialOptions?.find(social => social.id === item?.platform.toLowerCase())?.icon || ''} className={`text-xl ${color ? `${color}` : 'text-[#24292e]'}`}/>
            </a> )}
        </div>
    )
}

