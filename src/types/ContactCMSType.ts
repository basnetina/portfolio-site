export interface ContactCMSType {
    primaryLabel: string;
    secondaryLabel: string;
    email: string;
    phone: string;
    address: string;
}

export interface ContactCMSTypeEdit extends ContactCMSType {
    id: string;
}