import { TournamentType } from './tournament.type';

export class Tournament {

    id: number;
    type: TournamentType;
    date: string;
    comments: string;
    location: string;
    title: string;

    constructor(id: number, type: TournamentType, date: string, comments: string, location: string, title: string) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.comments = comments;
        this.location = location;
        this.title = title;
    }
}