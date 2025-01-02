import Notification from '../types/Notification';

const notifications: Notification[] = [
    {
        uuid: '1',
        moduleName: 'Tasks',
        moduleRecordUUID: '121',
        type: 'TASK_CREATED',
        title: 'New task',
        message: 'New task...',
        source: 'internal',
        active: true,
        status: 'sent',
        readedAt: null,
        createdAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '2',
        moduleName: 'Tasks',
        moduleRecordUUID: '121',
        type: 'TASK_DONE',
        title: 'Task',
        message: 'Task...',
        source: 'internal',
        active: true,
        status: 'sent',
        readedAt: null,
        createdAt: new Date().toISOString(),
        deletedAt: null,
    },
];

export default notifications;
