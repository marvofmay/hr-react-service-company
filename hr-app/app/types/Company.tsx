import Industry from './Industry';
import File from './File';

export default interface Company {
    uuid: string;
    companyUUID: string | null;
    fullName: string;
    shortName: string | null;
    nip: string;
    regon: string;
    description: string | null;
    // industry: Industry | null;
    // logo: File | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}