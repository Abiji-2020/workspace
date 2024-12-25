import { UserButton } from "app/features/auth/components/user-button"

export const Sidebar=()=>{
    return (
        <aside className="w-[70px] bg-[#481349] h-full flex flex-col gap-Y-4 items-center pt-[9px] pb-4">
            <WorkspaceSwitcher />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>
    )
}