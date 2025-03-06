"use client"
import {menuItems} from "@/navigations/menuItems";
import MenuItem from "@/components/pages/admin/MenuItem";
import {useSidebar} from "@/context/SidebarContext";
import { X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {Icon} from "@iconify/react";
import {useState} from "react";
import CustomConfirmationDialog from "@/components/custom-ui/dialog/CustomConfirmationDialog";
import {useRouter} from "next/navigation";

const Sidebar = () => {
    const {showSidebar: isOpen, toggleSidebar} = useSidebar()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const {data} = useSession()
    const router = useRouter()

    return  (
        <>
            {
                showLogoutDialog && (
                    <CustomConfirmationDialog
                        isOpen={showLogoutDialog}
                        onConfirm={()=> signOut()}
                        onCancel={()=> setShowLogoutDialog(false)}
                        title={'Logout Confirmation'}
                        message={'Are you sure you are trying to logout from the app ?'}
                    />
                )
            }
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>}

            <aside
                className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:relative md:translate-x-0
            `}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={()=> router.push('/admin/dashboard')}>Admin Panel</h2>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>
                <nav className="space-y-2 relative">
                    {menuItems.map((item) => (
                        <MenuItem key={item?.title} item={JSON.parse(JSON.stringify(item))} />
                    ))}

                    {data && (
                        <button
                            onClick={() => setShowLogoutDialog(true)}
                            className="w-full text-gray-400 hover:text-white text-left p-2 hover:bg-gray-700 rounded flex items-center gap-3"
                        >
                            <Icon icon={'tabler:logout'} />
                            Logout
                        </button>
                    )}
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;