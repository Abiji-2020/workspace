import { UserButton } from "app/features/auth/components/user-button"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { SidebarButton } from "./sidebar-button"
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react"
import { usePathname } from "next/navigation"

export const Sidebar=()=>{
    const pathname=usePathname()
    return (
        <aside className="w-[70px] bg-[#481349] h-full flex flex-col gap-Y-4 items-center pt-[9px] pb-4">
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="home" isActive={pathname?.includes("/workspace")}/>
            <SidebarButton icon={MessageSquare} label="DM's" />
            <SidebarButton icon={Bell} label="Activity" />
            <SidebarButton icon={MoreHorizontal} label="More" />

            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>
    )
}