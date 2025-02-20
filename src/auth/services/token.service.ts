import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) {}

  // Générer un accessToken
  generateAccessToken(userId: number, email: string): string {
    return this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_SECRET_KEY_EXPIRE'),
      },
    );
  }

  // Générer un refreshToken
  generateRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_SECRET_EXPIRE'),
      },
    );
  }

  // Vérifier un accessToken
  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
    } catch {
      throw new Error('Token invalide');
    }
  }

  // Vérifier un refreshToken
  verifyRefreshToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new Error('Refresh token invalide');
    }
  }

  // Génération du token de réinitialisation
  generateResetToken(userId: string, email: string): string {
    return this.jwtService.sign(
      { sub: userId, email },
      { secret: this.configService.get('JWT_RESET_SECRET'), expiresIn: '1h' },
    );
  }

  // Vérification du token de réinitialisation
  verifyResetToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_RESET_SECRET'),
    });
  }
  // Effacement du token de rafraîchissement lors de la déconnexion
  async logout(userId: number): Promise<void> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    user.refreshToken = '';
    await this.authRepository.save(user);
  }
}
