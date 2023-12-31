interface IBlog {
    id:  number; 
    content: string;
    author: string;
    title: string;
}

interface IUser {
    id: number;
    email: string | null;
    profileImage: string | null;
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

interface IDonationHistory{
    id: number | null;
    donationDate: Date | null;
    donatedAmount: number | null;
    healthCheckResult: string | null;
}

interface IRecipient {
    id: number;
    fullName: string;
    birthDate: Date;
    gender: string;
    address: string;
    phoneNumber: string;
    bloodType: string;
    rhFactor: string;
    requiredAmount: number;
}

interface IManagementAccount {
    id: number;
    username: string;
    email: string;
    roles: string;
    isLocked: boolean;
    profileImage: string;
}

interface IJoonRoom {
    id: number;
    name: string;
    participantsCount: number;
    maxParticipants: number;
    purpose: string;
    location: string;
    donationInstructions: string;
}


