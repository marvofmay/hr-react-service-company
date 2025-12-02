import Address from './Address';

export default interface Department {
    uuid: string;
    name: string | null;
    company?: {
        uuid: string | null;
        name: string | null;
    }
    departmentSuperior: {
        uuid: string | null;
        name: string | null;
    }
    index?: number;
    description: string | null;
    address: Address;
    phone: string | null;
    email: string | null;
    web: string | null;
    active: boolean;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}