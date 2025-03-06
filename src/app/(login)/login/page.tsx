"use client"

import {useEffect, useState} from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {EyeIcon, EyeOff} from "lucide-react";

interface LoginFormInputs {
    email: string
    password: string
}

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {data: session} = useSession()
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>()

    useEffect(() => {
        if(session){
            router.push('/admin/dashboard')
        }
    }, [session]);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {

        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: '/admin/dashboard'
            })
            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push(result?.url || "/admin/dashboard");
            }
        } catch (error) {
            setError("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-0 text-center text-gray-800">Login to Your Account</h2>
                <h4 className="text-sm mb-6 text-center text-gray-800 font-serif italic">
                    Login to your portfolio
                </h4>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {required: 'Password is required'})}
                                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                aria-describedby="password"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" aria-hidden="true"/>
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true"/>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Log in"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

