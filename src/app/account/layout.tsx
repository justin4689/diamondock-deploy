 'use client'
 import { AccountSidebar } from "@/components/account/AccountSideBar";
import { useState } from "react";


export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState('profile');
    return <div className="flex min-h-screen bg-gray-100">
        <AccountSidebar activeSection={activeSection} setActiveSection={setActiveSection} link={''} />
        <div className="flex-1">
            {children}
        </div>
    </div>;
}