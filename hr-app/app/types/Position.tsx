export default interface Position {
    uuid: string;
    name: string;
    description: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
