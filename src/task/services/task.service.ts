import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  //Creation d'une tache
  async create(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.create(dto);
  }

  //Recuperation de toutes les taches
  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();
    if (tasks.length === 0) {
      throw new Error('No tasks found');
    }
    return tasks;
  }

  //Recuperation d'une tachpe par id
  async findById(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  //Mise à jour d'une tache par id
  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.taskRepository.findById(id);
    if (!taskToUpdate) {
      throw new Error(`Task with id ${id} not found`);
    }
    return this.taskRepository.update(id, dto);
  }

  //Suppression d'une tache par id
  async delete(id: string): Promise<Task> {
    const taskToDelete = await this.taskRepository.findById(id);
    if (!taskToDelete) {
      throw new Error(`Task with id ${id} not found`);
    }
    return this.taskRepository.delete(id);
  }
}
