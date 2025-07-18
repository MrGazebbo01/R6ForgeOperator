
import React, { useState, useCallback } from 'react';
import { ATTACKER_GADGETS, DEFENDER_GADGETS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from './constants';
import type { OperatorRole, GeneratedOperatorData } from './types';
import { generateOperatorDetails, generateOperatorIcon } from './services/geminiService';
import Header from './components/Header';
import WeaponSelector from './components/WeaponSelector';
import GadgetSelector from './components/GadgetSelector';
import OperatorDetails from './components/OperatorDetails';
import { SpinnerIcon } from './components/icons/SpinnerIcon';

const App: React.FC = () => {
    const [callsign, setCallsign] = useState('');
    const [role, setRole] = useState<OperatorRole>('Attacker');
    const [primaryWeapons, setPrimaryWeapons] = useState<string[]>([]);
    const [secondaryWeapon, setSecondaryWeapon] = useState<string[]>([]);
    const [gadgets, setGadgets] = useState<string[]>([]);
    const [uniqueAbility, setUniqueAbility] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedOperator, setGeneratedOperator] = useState<GeneratedOperatorData | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleRoleChange = (newRole: OperatorRole) => {
        setRole(newRole);
        setGadgets([]);
    };

    const isFormValid = callsign && primaryWeapons.length > 0 && secondaryWeapon.length > 0 && gadgets.length > 0 && uniqueAbility;

    const handleSubmit = useCallback(async () => {
        if (!isFormValid) {
            setError('Please fill out all fields before generating an operator.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedOperator(null);
        setGeneratedImage(null);

        const operatorInput = {
            callsign,
            role,
            primaryWeapons,
            secondaryWeapon: secondaryWeapon[0],
            gadgets,
            uniqueAbility,
        };

        try {
            const [details, image] = await Promise.all([
                generateOperatorDetails(operatorInput),
                generateOperatorIcon(operatorInput)
            ]);

            setGeneratedOperator(details);
            setGeneratedImage(`data:image/jpeg;base64,${image}`);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
        } finally {
            setIsLoading(false);
        }
    }, [isFormValid, callsign, role, primaryWeapons, secondaryWeapon, gadgets, uniqueAbility]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Creator Column */}
                    <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-3xl font-bold text-white border-b-2 border-orange-500 pb-2">Operator Dossier</h2>
                        
                        <div>
                            <label htmlFor="callsign" className="block text-sm font-medium text-gray-300 mb-1">Callsign</label>
                            <input
                                type="text"
                                id="callsign"
                                value={callsign}
                                onChange={(e) => setCallsign(e.target.value)}
                                placeholder="e.g., Spectre"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <span className="block text-sm font-medium text-gray-300 mb-2">Role</span>
                            <div className="flex space-x-2">
                                <button onClick={() => handleRoleChange('Attacker')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${role === 'Attacker' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}>Attacker</button>
                                <button onClick={() => handleRoleChange('Defender')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${role === 'Defender' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}>Defender</button>
                            </div>
                        </div>

                        <WeaponSelector title="Primary Weapons" weaponList={PRIMARY_WEAPONS} selectedWeapons={primaryWeapons} onChange={setPrimaryWeapons} maxSelections={2} />
                        <WeaponSelector title="Secondary Weapon" weaponList={SECONDARY_WEAPONS} selectedWeapons={secondaryWeapon} onChange={setSecondaryWeapon} maxSelections={1} />
                        <GadgetSelector title="Gadgets" gadgetList={role === 'Attacker' ? ATTACKER_GADGETS : DEFENDER_GADGETS} selectedGadgets={gadgets} onChange={setGadgets} maxSelections={2} />

                        <div>
                            <label htmlFor="ability" className="block text-sm font-medium text-gray-300 mb-1">Unique Ability</label>
                            <textarea
                                id="ability"
                                value={uniqueAbility}
                                onChange={(e) => setUniqueAbility(e.target.value)}
                                rows={4}
                                placeholder="Describe the operator's unique gadget or skill. e.g., 'Deploys a sticky drone that can fire a disorienting sonic pulse.'"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !isFormValid}
                                className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
                            >
                                {isLoading ? <><SpinnerIcon /> Generating...</> : 'Forge Operator'}
                            </button>
                            {!isFormValid && <p className="text-xs text-center text-red-400 mt-2">All fields must be filled to forge an operator.</p>}
                        </div>

                    </div>

                    {/* Output Column */}
                    <div className="flex flex-col gap-6">
                         {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        {isLoading && (
                             <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-h-[500px]">
                                <SpinnerIcon />
                                <p className="text-lg font-semibold text-gray-300 mt-4">Forging Operator...</p>
                                <p className="text-sm text-gray-400">The AI is generating backstory, balancing stats, and creating an icon.</p>
                            </div>
                        )}
                        {!isLoading && !generatedOperator && (
                             <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center text-center min-h-[500px]">
                                <h3 className="text-2xl font-bold text-white">Operator Profile Will Appear Here</h3>
                                <p className="text-gray-400 mt-2 max-w-md">Complete the dossier on the left and click "Forge Operator" to use AI to bring your character to life.</p>
                             </div>
                        )}
                        {generatedOperator && generatedImage && (
                            <OperatorDetails data={generatedOperator} image={generatedImage} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
