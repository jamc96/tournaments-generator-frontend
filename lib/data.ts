import { Round } from './types';
const data: Round[] = [
    {
        id: 'm5gr84i9',
        title: 'Cat A, Jornada #1',
        type: 'teams',
        players: ['Jose Mejia', 'Denis Sierra', 'Oscar Perez', 'Sierra | Perez', 'Alfredo Morazan', 'Juvinny Pinzon', 'Job Quezada', 'Pinzon | Quezada'],
    },
    {
        id: '3u1reuv4',
        title: 'Cat A, Jornada #1',
        type: 'teams',
        players: ['player 1', 'player 2', 'player 3'],
    },
    {
        id: 'derv1ws0',
        title: 'Cat A, Jornada #1',
        type: 'teams',
        players: ['player 1', 'player 2', 'player 3'],
    },
    {
        id: '5kma53ae',
        title: 'Cat A, Jornada #1',
        type: 'teams',
        players: ['player 1', 'player 2', 'player 3'],
    },
    {
        id: 'bhqecj4p',
        title: 'Cat A, Jornada #1',
        type: 'teams',
        players: ['player 1', 'player 2', 'player 3'],
    },
];

export async function getRounds() {
    return data;
}

export async function getRoundsById(id: string) {
    return data.find((round) => round.id === id) || null;

}