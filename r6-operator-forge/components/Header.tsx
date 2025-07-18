
import React from 'react';
import { HexagonIcon } from './icons/HexagonIcon';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center gap-3">
                    <HexagonIcon className="w-10 h-10 text-orange-500" />
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider uppercase">
                        R6 Operator <span className="text-orange-500">Forge</span>
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
