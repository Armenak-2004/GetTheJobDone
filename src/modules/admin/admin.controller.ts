import { Response } from 'express';
import { AuthRequest } from '../../types/index';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../utils/hash';
import { errorHandler } from '../../middleware/errorHandler';

const prisma = new PrismaClient();

export const getUsersByAdmin = async (req: AuthRequest, res: Response) => {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins only.", 403)
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    res.status(200).json({
        success: true,
        data: users,
    });
};

export const createUserByAdmin = async (req: AuthRequest, res: Response) => {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins only.", 403)
    }

    const { email, username, password, role } = req.body;

    const existingEmailUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }],
        },
    });

    if (existingEmailUser) {
        return errorHandler(res, "Email already exists", 400)
    }

    const existingUsernamelUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }],
        },
    });

    if (existingUsernamelUser) {
        return errorHandler(res, "Username already exists", 400)
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: role,
        },
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
    });
};

export const pathUserByAdmin = async (req: AuthRequest, res: Response) => {
    const userRole = req.user?.role;
    const id = String(req.params.id); //req.params always returns string
    const { role, isActive } = req.body;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins only.", 403)
    }

    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    if (Object.keys(updateData).length === 0) {
        return errorHandler(res, "No fields to update", 400)
    }

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    res.json({
        success: true,
        message: 'User updated successfully',
        data: user,
    });
};

export const deleteUserByAdmin = async (req: AuthRequest, res: Response) => {
    const userRole = req.user?.role;
    const id = String(req.params.id); //req.params always returns string

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied.You can only delete your own account.", 403)
    }

    await prisma.user.delete({
        where: { id },
    });

    res.status(204).json({
        success: true,
        message: 'User deleted successfully',
    });
};

export const createTaskByAdmin = async (req: AuthRequest, res: Response) => {
    const { title, description, status, priority, dueDate } = req.body;
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins olny.", 403)
    }

    const task = await prisma.task.create({
        data: {
            title,
            description,
            status,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null
        },
    });

    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
    });
};

export const patchTaskByAdmin = async (req: AuthRequest, res: Response) => {
    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user?.userId;
    const id = String(req.params.id); //req.params always returns string
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins olny.", 403)
    }

    const existingTask = await prisma.userTask.findFirst({
        where: {
            taskId: id,
            userId: userId,
        },
    });

    if (!existingTask) {
        return errorHandler(res, "Task not found", 404)
    }

    const task = await prisma.task.update({
        where: { id },
        data: {
            title,
            description,
            status,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
        },
    });

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
    });
};

export const deleteTaskByAdmin = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const id = String(req.params.id); //req.params always returns string
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
        return errorHandler(res, "Access denied. Admins olny.", 403)
    }

    const existingTask = await prisma.userTask.findFirst({
        where: {
            taskId: id,
            userId: userId,
        },
    });

    if (!existingTask) {
        return errorHandler(res, "Task not found", 404)
    }

    await prisma.task.delete({
        where: { id },
    });

    res.status(204).json({
        success: true,
        message: 'Task deleted successfully',
    });
};