export default interface Employee {
    uuid: string;
    companyUUID: string | null;
    company?: string | null;
    departmentUUID: string | null;
    department?: string | null;
    employeeUUID: string | null;
    employeeSuperior?: string | null;
    roleUUID: string;
    role?: string;
    firstName: string;
    lastName: string;
    birth: string;
    email: string;
    phone: string[];
    employmentFrom: string;
    employmentTo: string | null;
    positionUUID: string;
    position?: string;
    contractTypeUUID: string,
    contractType?: string,
    active: boolean;
    country: string;
    city: string;
    postcode: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
