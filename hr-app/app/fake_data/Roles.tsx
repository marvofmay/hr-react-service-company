import Role from '../types/Role';

const roles: Role[] = [
    {
        uuid: '1',
        name: 'guest',
        description: 'A user with limited access, typically only able to view public content.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '2',
        name: 'user',
        description: 'A registered user with access to standard features and personal content.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '3',
        name: 'content creator',
        description: 'Responsible for creating new content, such as articles, posts, or media.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '4',
        name: 'content editor',
        description: 'Can edit and improve existing content to maintain quality and relevance.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '5',
        name: 'content moderator',
        description: 'Reviews and moderates content to ensure it meets guidelines and standards.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '6',
        name: 'admin',
        description: 'Manages users and settings; has broader control over platform features.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '7',
        name: 'super admin',
        description: 'Has the highest level of control with full access to all system features.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
];

export default roles;
