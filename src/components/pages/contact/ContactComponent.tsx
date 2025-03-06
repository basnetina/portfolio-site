"use client"

import {useState} from "react";
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import {FormSubmitHandler, useForm} from "react-hook-form";
import {useAddContactMutation} from "@/store/features/contacts";
import {useCustomToast} from "@/hooks/useCustomToast";
import {ContactDetails} from "@/components/pages/contact/ContactDetails";
import {useFetchCMSContactQuery} from "@/store/features/cms/contact";

const ContactComponent = () => {
    const [addContact, {isLoading, data}] = useAddContactMutation()
    const {data: contact} = useFetchCMSContactQuery(process.env.NEXT_PUBLIC_MY_EMAIL)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    const {handleSubmit, register, reset} = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    })

    const handleContactSubmit = (data: any) => {
        setIsSubmitting(true)
        addContact({...data, contact_to: process.env.NEXT_PUBLIC_MY_EMAIL})
        reset();
    }

    useCustomToast({
        data,
        successFn: () => {
            setSubmitMessage("Thank you for your message. I'll get back to you soon!")
            reset();
            setIsSubmitting(false)
            setTimeout(()=>{
                setSubmitMessage("")
            }, 3000)
        }
    })


    return (
        <>
            <section id="contact" className="py-16 bg-white mt-4 w-full rounded dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">{contact?.primaryLabel ?? "Get in Touch"}</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <motion.div
                            className="flex-1"
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <ContactDetails contact={contact}/>
                        </motion.div>
                        <motion.div
                            className="flex-1"
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="name"
                                           className="block text-sm font-medium mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-3 py-2 border text-gray-500 dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Your Name"
                                        {...register('name')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-3 py-2 border text-gray-500 dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="your@email.com"
                                        {...register('email')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message"
                                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 text-gray-500 dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Your message here..."
                                        {...register('message')}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isSubmitting ? (
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <Send className="w-5 h-5 mr-2" />
                                    )}
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                            {submitMessage && (
                                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {submitMessage}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactComponent