export default interface Module {
    uuid: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}