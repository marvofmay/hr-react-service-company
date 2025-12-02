import Company from '../types/Company';

const companies: Company[] = [
    {
        uuid: '1',
        companySuperior: {
            uuid: '',
            name: '',
        },
        fullName: 'Tech Innovators Inc.',
        shortName: 'TechInno',
        description: null,
        nip: '1234567890',
        regon: '0987654321',
        industry: {
            uuid: '1',
            name: 'Technology',
        },
        //logo: null,
        active: true,
        address: {
            country: 'Polska',
            city: 'Gdańsk',
            postcode: '12-123',
            street: 'wwewe',
        },
        phone: ["123-123-123", "121-121-121"],
        email: ["lorem@example.com", "ipsum@example.com"],
        web: ["https://lorem.com", "https://ipsum.com"],
        departments: [{
            uuid: '1',
            name: 'Departament 1',
            departmentSuperior: {
                uuid: '',
                name: '',
            },
            description: '',
            address: {
                country: 'Polska',
                city: 'Gdańsk',
                postcode: '12-123',
                street: 'Nipołomnicka 1/3'
            },
            phone: '111-222-333',
            email: 'email@wp.pl',
            web: 'https://interia.pl',
            active: true,
            createdAt: '2024-10-27T12:00:10'
        },
        {
            uuid: '2',
            name: 'Departament 2',
            departmentSuperior: {
                uuid: '1',
                name: 'Departament 1',
            },
            description: '',
            address: {
                country: 'Polska',
                city: 'Gdańsk',
                postcode: '11-111',
                street: 'Nipołomnicka 1/3'
            },
            phone: '111-222-333',
            email: 'email@wp.pl',
            web: 'https://interia.pl',
            active: true,
            createdAt: '2024-10-27T12:00:10'
        },
        {
            uuid: '3',
            name: 'Departament 3',
            departmentSuperior: {
                uuid: '1',
                name: 'Departament 1',
            },
            description: '',
            address: {
                country: 'Polska',
                city: 'Gdańsk',
                postcode: '11-111',
                street: 'Nipołomnicka 1/3'
            },
            phone: '111-222-333',
            email: 'email@wp.pl',
            web: 'https://interia.pl',
            active: true,
            createdAt: '2024-10-27T12:00:10'
        }],
        createdAt: '2024-10-27T12:00:10',
        updatedAt: '2024-10-27T14:00:30',
        deletedAt: null,
    },
    {
        uuid: '2',
        companySuperior: {
            uuid: '1',
            name: 'Tech Innovators Inc.',
        },
        fullName: 'Green Solutions Ltd.',
        shortName: 'GreenSol',
        description: null,
        nip: '2345678901',
        regon: '1234567890',
        industry: {
            uuid: '1',
            name: 'Technology',
        },
        //logo: null,
        active: true,
        address: {
            country: 'U.S.A.',
            city: 'New York',
            postcode: '12-123',
            street: 'wwewe',
        },
        phone: [""],
        email: [""],
        web: [""],
        departments: [],
        createdAt: '2024-10-27T12:10:00',
        updatedAt: '2024-10-27T12:10:00',
        deletedAt: null,
    },
    {
        uuid: '3',
        companySuperior: {
            uuid: '',
            name: '',
        },
        fullName: 'Code LTD',
        shortName: 'Code',
        description: null,
        nip: '234567',
        regon: '1234567890',
        industry: {
            uuid: '3',
            name: 'Education'
        },
        //logo: null,
        active: true,
        address: {
            country: 'England',
            city: 'London',
            postcode: '11-334',
            street: 'Oxford 43'
        },
        phone: [""],
        email: [""],
        web: [""],
        departments: [],
        createdAt: '2024-12-20T12:45:00',
        updatedAt: '2024-12-20T12:45:00',
        deletedAt: null,
    },
];

export default companies;