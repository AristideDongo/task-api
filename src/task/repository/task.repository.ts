import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../interface/task.repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async save(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id: string, task: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.taskRepository.findOne({ where: { id } });
    if (!taskToUpdate) {
      throw new Error('Task not found');
    }
    return this.taskRepository.save({ ...taskToUpdate, ...task });
  }

  async delete(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskRepository.remove(task);
  }
}
