import {ContactAdminComponent} from "@/components/pages/admin/contact/ContactAdminComponent";

const ContactPage = () => {
    return (
        <>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
                <ContactAdminComponent />
            </div>
        </>
    )
}

export default ContactPage