export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
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

