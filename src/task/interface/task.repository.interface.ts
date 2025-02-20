import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: CreateTaskDto): Promise<Task>;
  update(id: string, task: UpdateTaskDto): Promise<Task>;
  delete(id: string): Promise<Task>;
  save(task: Task): Promise<Task>;
}
