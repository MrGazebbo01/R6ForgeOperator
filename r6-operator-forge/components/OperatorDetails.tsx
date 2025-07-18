
import React from 'react';
import type { GeneratedOperatorData } from '../types';

interface OperatorDetailsProps {
    data: GeneratedOperatorData;
    image: string;
}

const OperatorDetails: React.FC<OperatorDetailsProps> = ({ data, image }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-gray-700 pb-6 mb-6">
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-full animate-pulse-slow"></div>
                    <img 
                        src={image} 
                        alt={`${data.callsign} Icon`} 
                        className="w-full h-full rounded-full object-cover border-4 border-gray-800 relative"
                    />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-center sm:text-left">{data.callsign}</h2>
                    <p className="text-lg text-gray-300 text-center sm:text-left">{data.realName}</p>
                    <p className={`text-md font-semibold mt-1 text-center sm:text-left ${data.role === 'Attacker' ? 'text-orange-400' : 'text-cyan-400'}`}>
                        {data.role.toUpperCase()}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">Backstory</h3>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{data.backstory}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-2">Gameplay Analysis</h3>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{data.gameplayAnalysis}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Developer's Note</h3>
                    <p className="text-gray-400 italic whitespace-pre-wrap leading-relaxed">"{data.developerNote}"</p>
                </div>
            </div>
        </div>
    );
};

export default OperatorDetails;
