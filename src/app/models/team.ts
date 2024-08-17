import { Game } from "./game";

export interface Team {

    id: string;
    team_name: string;
    coach:string;
    coach_email: string;
    games: Game[];
    team_logo: string;
}
