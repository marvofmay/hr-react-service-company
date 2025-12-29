export default interface Position {
    uuid: string;
    name: string;
    description?: string;
    active: boolean;
    departmentsUUIDs: string[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
