
import React from 'react';

interface WeaponSelectorProps {
    title: string;
    weaponList: readonly string[];
    selectedWeapons: string[];
    onChange: (selected: string[]) => void;
    maxSelections: number;
}

const WeaponSelector: React.FC<WeaponSelectorProps> = ({ title, weaponList, selectedWeapons, onChange, maxSelections }) => {
    const handleSelect = (weapon: string) => {
        const isSelected = selectedWeapons.includes(weapon);
        if (isSelected) {
            onChange(selectedWeapons.filter(w => w !== weapon));
        } else if (selectedWeapons.length < maxSelections) {
            onChange([...selectedWeapons, weapon]);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {weaponList.map(weapon => {
                    const isSelected = selectedWeapons.includes(weapon);
                    const isDisabled = !isSelected && selectedWeapons.length >= maxSelections;
                    return (
                        <button
                            key={weapon}
                            onClick={() => handleSelect(weapon)}
                            disabled={isDisabled}
                            className={`p-2 text-center text-xs sm:text-sm font-medium rounded-md transition-all duration-200 border-2 ${
                                isSelected 
                                ? 'bg-orange-500 border-orange-400 text-white shadow-md' 
                                : `bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`
                            }`}
                        >
                            {weapon}
                        </button>
                    );
                })}
            </div>
            <p className="text-xs text-gray-400 mt-1">Select up to {maxSelections}.</p>
        </div>
    );
};

export default WeaponSelector;
