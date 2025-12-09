//import File from './File';
import Industry from './Industry';
import Address from './Address';

export default interface Company {
    uuid: string;
    companySuperior: {
        uuid: string | null;
        name: string | null;
    },
    fullName?: string;
    shortName?: string | null;
    internalCode: string;
    nip?: string;
    regon?: string;
    description?: string | null;
    industry: Industry;
    // logo: File | null;
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