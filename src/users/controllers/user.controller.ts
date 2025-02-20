import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async findById(@Body() id: number) {
    return this.userService.findById(id);
  }

  @Get('email')
  @ApiOperation({ summary: 'Get user by email' })
  async findByEmail(@Body() email: string) {
    return this.userService.findByEmail(email);
  }
}
