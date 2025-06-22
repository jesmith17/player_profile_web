import { Team } from "./team";

export interface Athletics {
    recruitment: Recruitment;
    commited_school: string;
    position: String[];
    experience: Number;
    jersey: Number;
    awards: String[];
    notes: String;
    teams: Team[];
}


export enum Recruitment {
  OPEN="Open",
  CLOSED="Closed",
  COMMITTED="Committed",
}
