import { Response } from 'express';
import { AuthRequest } from '../../types/index';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../../middleware/errorHandler';

const prisma = new PrismaClient();


export const getUserTasks = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    const tasks = await prisma.task.findMany({
        where: {
            userTasks: {
                some: {
                    userId: userId,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: tasks,
    });
};

export const getUser = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
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

    if (!user) {
        return errorHandler(res, "User not found", 404)
    }

    res.status(200).json({
        success: true,
        data: user,
    });
};

export const patchUser = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const { email, username } = req.body;

    const existingEmailUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }],
            NOT: { id: userId },
        },
    });

    if (existingEmailUser) {
        return errorHandler(res, "Email already exists", 400)
    }

    const existingUsernamelUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }],
            NOT: { id: userId },
        },
    });

    if (existingUsernamelUser) {
        return errorHandler(res, "Username already exists", 400)
    }

    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (username !== undefined) updateData.username = username;

    if (Object.keys(updateData).length === 0) {
        return errorHandler(res, "No fields to update", 400)
    }

    const user = await prisma.user.update({
        where: { id: userId },
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
        message: 'Profile updated successfully',
        data: user,
    });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
    const id = req.user?.userId;

    await prisma.user.delete({
        where: { id },
    });

    res.status(204).json({
        success: true,
        message: 'User deleted successfully',
    });
};

export const assignTask = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.userId) //either string or undefined
    const id = String(req.params.id); //req.params always returns string

    const task = await prisma.task.findUnique({
        where: { id },
    });

    if (!task) {
        return errorHandler(res, "Task not found", 404)
    }

    const existingAssignment = await prisma.userTask.findUnique({
        where: {
            userId_taskId: {
                userId: userId,
                taskId: id,
            },
        },
    });

    if (existingAssignment) {
        return errorHandler(res, "You are already assigned to this task", 400)
    }

    await prisma.userTask.create({
        data: {
            userId: userId,
            taskId: id,
        },
    });

    res.json({
        success: true,
        message: `Task assigned successfully`,
    });
};