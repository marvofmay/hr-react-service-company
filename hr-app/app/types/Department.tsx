import Address from './Address';

export default interface Department {
    uuid: string;
    company: {
        uuid: string;
        name: string;
    }
    departmentSuperior: {
        uuid: string | null;
        name: string | null;
    }
    name: string;
    description: string | null;
    address: Address;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}