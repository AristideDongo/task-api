import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Creation d'une tache
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a task' })
  async create(@Body() dto: CreateTaskDto) {
    const task = await this.taskService.create(dto);
    return task;
  }

  // Recuperation de toutes les taches
  @Get('findAll')
  @ApiOperation({ summary: 'Find all tasks' })
  async findAll() {
    const tasks = await this.taskService.findAll();
    return tasks;
  }

  // Recuperation d'une tachpe par id
  @Get('findById/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find a task by id' })
  async findById(@Body() id: string) {
    const task = await this.taskService.findById(id);
    return task;
  }

  // Mise à jour d'une tache par id
  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.update(id, dto);
    return updatedTask;
  }

  // Suppression d'une tache par id
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a task by id' })
  async delete(@Body() id: string) {
    const deletedTask = await this.taskService.delete(id);
    return deletedTask;
  }
}
