
export type Round = {
    id: string;
    title: string;
    type: 'teams' | 'doubles' | 'singles';
    players: string[];
};


export interface PlayersData {
    jugadorA: string;
    jugadorB: string;
    jugadorC: string;
    doblesC: string;
    jugadorX: string;
    jugadorY: string;
    jugadorZ: string;
    doblesZ: string;
    ultimoA: string;
    ultimoX: string;
}