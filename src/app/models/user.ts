export interface User {
    id: string;
    email: string;

    jwtToken: string;
    expirationDate: Date;
    expired: boolean;

    


}
