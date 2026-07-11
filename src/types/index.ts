import { Request } from 'express';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user' | 'moderator';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    userTasks?: UserTask[];
}

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;

    userTasks?: UserTask[];
}

export interface UserTask {
    userId: string;
    taskId: string;
    assignedAt: Date;
    user?: User;
    task?: Task;
}

// export interface Project {
//     id: string;
//     name: string;
//     description: string | null;
//     ownerId: string;
//     status: 'active' | 'archived' | 'deleted';
//     createdAt: Date;
//     updatedAt: Date;
// }