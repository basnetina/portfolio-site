"use client"
import {Icon} from "@iconify/react";
import {useSidebar} from "@/context/SidebarContext";

const CustomBurgerIcon = () => {
    const { toggleSidebar, showSidebar} = useSidebar()
    return (
        <div className={''}>
                <button onClick={toggleSidebar} className={'top-2 left-2 absolute md:hidden'}>
                    <Icon icon={'mdi:hamburger-open'} style={{
                        fontSize: '32px',
                        color: showSidebar ? 'white' : 'gray',
                        transform: showSidebar? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out',
                        cursor: 'pointer'
                    }}/>
                 </button>
        </div>
    )
}

export default CustomBurgerIcon