//import File from './File';
import Industry from './Industry';
import Address from './Address';
import Department from './Department';

export default interface Company {
    uuid: string;
    companySuperior: {
        uuid: string | null;
        name: string | null;
    },
    fullName?: string;
    shortName?: string | null;
    nip?: string;
    regon?: string;
    description?: string | null;
    industry: Industry;
    // logo: File | null;
    active?: boolean;
    address: Address;
    phone: string[];
    email: string[];
    web: string[];
    departments: Department[];
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}