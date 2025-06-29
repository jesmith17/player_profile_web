import {Roster} from "./roster";

export interface Athletics {
    recruitment: Recruitment;
    commited_school: string;
    position: String[];
    experience: Number;
    ncaaId: string;
    jersey: Number;
    awards: String[];
    notes: String;
    teams: Roster[];
}


export enum Recruitment {
  OPEN="Open",
  CLOSED="Closed",
  COMMITTED="Committed",
}
