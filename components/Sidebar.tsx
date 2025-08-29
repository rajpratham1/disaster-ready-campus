
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';
import { HomeIcon, BookOpenIcon, ShieldCheckIcon, PhoneIcon, XMarkIcon } from './icons/Icons';

interface SidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
    const { currentPage, setCurrentPage } = useAppContext();

    const navItems = [
        { name: Page.DASHBOARD, icon: <HomeIcon /> },
        { name: Page.MODULES, icon: <BookOpenIcon /> },
        { name: Page.DRILLS, icon: <ShieldCheckIcon /> },
        { name: Page.CONTACTS, icon: <PhoneIcon /> },
    ];

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md flex flex-col transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b md:justify-center">
                    <div className="flex items-center">
                        <ShieldCheckIcon className="w-10 h-10 text-blue-600" />
                        <h1 className="ml-3 text-2xl font-bold text-gray-800">Disaster Ready</h1>
                    </div>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.name)}
                            className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                                currentPage === item.name
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                            }`}
                        >
                            {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                            <span className="ml-4 font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <p className="text-sm text-blue-700">
                            Stay informed, stay safe. Your preparedness journey starts here.
                        </p>
                    </div>
                </div>
            </aside>
            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </>
    );
};

export default Sidebar;
