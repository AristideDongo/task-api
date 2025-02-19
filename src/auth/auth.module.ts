import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { HashService } from './services/hash.service';
import { TokenService } from './services/token.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    TokenService,
    JwtService,
    AuthRepository,
    ConfigService,
  ],
  exports: [AuthService],
  imports: [TypeOrmModule.forFeature([Auth])],
})
export class AuthModule {}
