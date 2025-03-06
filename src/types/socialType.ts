export type SocialType = {
    label: string,
    url: string,
    platform: string
}

export type SocialTypeGet = SocialType & {
    id: string
}