import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interfaces/auth.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findByEmail(email: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async save(auth: Auth): Promise<Auth> {
    return this.authRepository.save(auth);
  }

  async findById(id: number): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
