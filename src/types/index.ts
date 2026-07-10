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
    passwordHash: string;
    role: 'admin' | 'user' | 'manager';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'in-progress' | 'completed' | 'archived';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate: Date | null;
    userId: string;
    projectId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Project {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
    status: 'active' | 'archived' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
}