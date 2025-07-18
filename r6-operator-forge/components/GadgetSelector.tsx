
import React from 'react';

interface GadgetSelectorProps {
    title: string;
    gadgetList: readonly string[];
    selectedGadgets: string[];
    onChange: (selected: string[]) => void;
    maxSelections: number;
}

const GadgetSelector: React.FC<GadgetSelectorProps> = ({ title, gadgetList, selectedGadgets, onChange, maxSelections }) => {
    const handleSelect = (gadget: string) => {
        const isSelected = selectedGadgets.includes(gadget);
        if (isSelected) {
            onChange(selectedGadgets.filter(g => g !== gadget));
        } else if (selectedGadgets.length < maxSelections) {
            onChange([...selectedGadgets, gadget]);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {gadgetList.map(gadget => {
                    const isSelected = selectedGadgets.includes(gadget);
                    const isDisabled = !isSelected && selectedGadgets.length >= maxSelections;
                    return (
                        <button
                            key={gadget}
                            onClick={() => handleSelect(gadget)}
                            disabled={isDisabled}
                            className={`p-2 text-center text-xs sm:text-sm font-medium rounded-md transition-all duration-200 border-2 ${
                                isSelected 
                                ? 'bg-cyan-500 border-cyan-400 text-white shadow-md' 
                                : `bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`
                            }`}
                        >
                            {gadget}
                        </button>
                    );
                })}
            </div>
            <p className="text-xs text-gray-400 mt-1">Select up to {maxSelections}.</p>
        </div>
    );
};

export default GadgetSelector;
