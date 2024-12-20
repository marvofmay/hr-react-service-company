import File from './File';
import Industry from './Industry';
import Address from './Address';

export default interface Company {
    uuid: string;
    companyUUID?: string | null;
    fullName?: string;
    shortName?: string | null;
    nip?: string;
    regon?: string;
    description?: string | null;
    industry?: Industry;
    // logo: File | null;
    active?: boolean;
    address?: Address;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}