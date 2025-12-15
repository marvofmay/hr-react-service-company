//import File from './File';
import Industry from './Industry';
import Address from './Address';

export default interface Company {
    uuid: string;
    parentCompany?: {
        uuid: string | null;
        fullName: string | null;
        shortName: string | null;
        nip: string;
        regon: string | null;
    } | null,
    fullName?: string;
    shortName?: string | null;
    internalCode: string;
    nip: string;
    regon: string;
    description?: string | null;
    industry: Industry;
    // logo: File | null;
    active?: boolean;
    address: Address;
    contacts: {
        type: 'phone' | 'email' | 'website';
        data: string;
    }[];
    phones: string[];
    emails: string[];
    webs: string[];
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}