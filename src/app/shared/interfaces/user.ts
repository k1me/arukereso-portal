export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    role: boolean;
    registeredOn: Date;
    password: string;
}
export interface AuthUser { 
    email: string;
    password: string;
}

