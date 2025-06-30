export interface User {
    id: string;
    email: string;
    jwtToken: string;
    expirationDate: Date;
    expired: boolean;
    role: Role;
    editableIds: string[]

}

export enum Role {
  ADMIN= 'ADMIN',
  PARENT= 'PARENT',
  PLAYER= 'PLAYER',
}

