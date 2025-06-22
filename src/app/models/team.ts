import { Game } from "./game";
import {SocialMedia} from "./social-media";

export interface Team {

    _id: string;
    team_name: string;
    coach:string;
    coach_email: string;
    games: Game[];
    team_logo: string;
    social_media: SocialMedia[];
}
