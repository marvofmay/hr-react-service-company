export default interface ContractType {
    uuid: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}
