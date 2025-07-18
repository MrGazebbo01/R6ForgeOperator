
export type OperatorRole = 'Attacker' | 'Defender';

export interface OperatorInput {
    callsign: string;
    role: OperatorRole;
    primaryWeapons: string[];
    secondaryWeapon: string;
    gadgets: string[];
    uniqueAbility: string;
}

export interface GeneratedOperatorData {
    callsign: string;
    realName: string;
    role: OperatorRole;
    backstory: string;
    gameplayAnalysis: string;
    developerNote: string;
}
