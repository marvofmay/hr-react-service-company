import Employee from '../types/Employee';

const employees: Employee[] = [
    {
        uuid: '1',
        externalCode: '1257-323-12',
        company: {
            uuid: '1',
            name: 'Company 1'
        },
        department: {
            uuid: '1',
            name: 'Department 1'
        },
        employeeSuperior: {
            uuid: null,
            firstName: null,
            lastName: null,
        },
        position: {
            uuid: '1',
            name: 'Position 1'
        },
        contractType: {
            uuid: '1',
            name: 'Contract type 1'
        },
        address: {
            country: 'Polska',
            city: 'Gdańsk',
            postcode: '11-111',
            street: 'Cicha 2',
        },
        role: {
            uuid: '1',
            name: 'Role 1'
        },
        firstName: 'Emil',
        lastName: 'Johnson',
        pesel: '72022586569',
        email: 'emil.johnson@email.com',
        phone: ["333-222-111", "111-222-333"],
        employmentFrom: '2009-01-01',
        employmentTo: null,
        active: true,
        createdAt: '2024-06-11T15:30:45',
        updatedAt: '2024-12-17T07:30:00',
        deletedAt: null,
    },
    {
        uuid: '2',
        externalCode: '1254-333-22',
        company: {
            uuid: '1',
            name: 'Company 1'
        },
        department: {
            uuid: '2',
            name: 'Department 2'
        },
        employeeSuperior: {
            uuid: '1',
            firstName: 'Emil',
            lastName: 'Johnson',
        },
        position: {
            uuid: '2',
            name: 'Position 2'
        },
        contractType: {
            uuid: '2',
            name: 'Contract type 2'
        },
        address: {
            country: 'Polska',
            city: 'Sopot',
            postcode: '11-111',
            street: 'Wolna 2',
        },
        role: {
            uuid: '2',
            name: 'Role 2'
        },
        firstName: 'John',
        lastName: 'Doe',
        pesel: '88022028149',
        email: 'john.doe@email.com',
        phone: ["123-321-123"],
        employmentFrom: '2010-06-01',
        employmentTo: null,
        active: true,
        createdAt: '2024-12-20T11:30:45',
        updatedAt: '2024-12-20T11:30:45',
        deletedAt: null,
    },
];

export default employees;