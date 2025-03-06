
import {Mail, MapPin, Phone} from "lucide-react";
import {ContactCMSTypeEdit} from "@/types/ContactCMSType";



export function ContactDetails ({contact}:{contact: ContactCMSTypeEdit}) {

    return (
        <>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{contact?.secondaryLabel ?? "Contact Information"}</h3>
            <div className="space-y-4">
                <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-blue-500"/>
                    <span className="text-gray-600 dark:text-gray-300">{contact?.email}</span>
                </div>
                <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-2 text-blue-500"/>
                    <span className="text-gray-600 dark:text-gray-300">{contact?.phone}</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-blue-500"/>
                    <span className="text-gray-600 dark:text-gray-300">{contact?.address}</span>
                </div>
            </div>
        </>
    )
}

