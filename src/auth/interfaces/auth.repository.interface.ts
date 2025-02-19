import { Auth } from '../entities/auth.entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<Auth>;
  save(auth: Auth): Promise<Auth>;
  findById(id: number): Promise<Auth>;
}
