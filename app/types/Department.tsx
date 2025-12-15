import Address from './Address';

export default interface Department {
    uuid: string;
    name: string | null;
    internalCode: string;
    company: {
        uuid: string | null;
        fullName: string | null;
    }
    parentDepartment?: {
        uuid: string | null;
        name: string | null;
    }
    description: string | null;
    active?: boolean;
    address: Address;
    contacts: {
        type: string,
        data: string
    }[],
    phones: string[];
    emails: string[];
    webs: string[];
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}