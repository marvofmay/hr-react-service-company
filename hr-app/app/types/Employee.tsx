export default interface Employee {
    uuid: string;
    employeeUUID: string | null,
    firstName: string;
    lastName: string;
    birth: string;
    employmentFrom: string;
    employmentTo: string | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
