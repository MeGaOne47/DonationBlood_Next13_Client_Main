interface IBlog {
    id:  number; 
    content: string;
    author: string;
    title: string;
}

interface IUser {
    id: number;
    email: string | null;
    picture: string | null;
    username: string | null;
}

interface IDonor {
    id: number | null;
    fullName: string | null;
    birthDate: Date | null;
    gender: string | null;
    address: string | null;
    phoneNumber: string | null;
    bloodType: string | null;
    rhFactor: string | null;
}
