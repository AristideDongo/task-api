import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { HashService } from './hash.service';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dtos/register.dto';
import { Auth } from '../entities/auth.entity';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly authRepository: AuthRepository,
  ) {}

  //Inscription d'un nouvel utilisateur
  async register(registerDto: RegisterDto) {
    const hashPassword = await this.hashService.hashPassword(
      registerDto.password,
    );
    const userId = Math.floor(Math.random() * 1000);
    const refreshToken = this.tokenService.generateRefreshToken(userId);

    const hashRefreshToken = await this.hashService.hashPassword(refreshToken);

    const user = new Auth();
    user.email = registerDto.email;
    user.password = hashPassword;
    user.firstName = registerDto.firstName;
    user.lastName = registerDto.lastName;
    user.refreshToken = hashRefreshToken;

    const createdUser = this.authRepository.save(user);
    return {
      accessToken: this.tokenService.generateAccessToken(
        (await createdUser).id,
        (await createdUser).email,
      ),
      refreshToken: refreshToken,
    };
  }
  //Connexion d'un utilisateur
  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (
      !user ||
      !(await this.hashService.comparePassword(
        loginDto.password,
        user.password,
      ))
    ) {
      throw new Error('Invalid credentials');
    }
    const userId = user.id;
    const refreshToken = this.tokenService.generateRefreshToken(userId);

    const hashRefreshToken = await this.hashService.hashPassword(refreshToken);

    user.refreshToken = hashRefreshToken;
    await this.authRepository.save(user);

    return {
      accessToken: this.tokenService.generateAccessToken(user.id, user.email),
      refreshToken: refreshToken,
    };
  }

  //RefreshToken//
  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const refreshToken = refreshTokenDto.refreshToken;
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      const userId = Number(payload.sub);
      if (isNaN(userId)) {
        throw new UnauthorizedException('Token de rafraîchissement invalide');
      }

      const user = await this.authRepository.findById(userId);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Token de rafraîchissement invalide');
      }

      // Vérification que le token de rafraîchissement fourni correspond au hash stocké
      const isRefreshTokenValid = await this.hashService.comparePassword(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Token de rafraîchissement invalide');
      }

      // Génération des nouveaux tokens
      const newAccessToken = this.tokenService.generateAccessToken(
        user.id,
        user.email,
      );
      const newRefreshToken = this.tokenService.generateRefreshToken(user.id);

      // Hashage et stockage du nouveau token de rafraîchissement
      user.refreshToken = await this.hashService.hashPassword(newRefreshToken);
      await this.authRepository.save(user);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException(
        'Token de rafraîchissement invalide ou expiré',
      );
    }
  }

  //Deconnexion d'un utilisateur//
  async logout(userId: number): Promise<void> {
    await this.tokenService.logout(userId);
  }

  // Demande de réinitialisation de mot de passe//
  async requestPasswordReset(email: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Générer un token de réinitialisation
    const resetToken = this.tokenService.generateResetToken(
      user.id.toString(),
      user.email,
    );

    const hashedResetToken = await this.hashService.hashPassword(resetToken);

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await this.authRepository.save(user);

    return { resetToken };
  }

  // Réinitialisation du mot de passe avec le token//
  async resetPassword(dto: ResetPasswordDto) {
    try {
      const payload = this.tokenService.verifyResetToken(dto.token);
      const userId = Number(payload.sub);

      const user = await this.authRepository.findById(userId);
      if (!user || !user.resetPasswordToken) {
        throw new UnauthorizedException('Token invalide');
      }

      if (user.resetPasswordExpires < new Date()) {
        throw new UnauthorizedException('Token expiré');
      }

      const isTokenValid = await this.hashService.comparePassword(
        dto.token,
        user.resetPasswordToken,
      );

      if (!isTokenValid) {
        throw new UnauthorizedException('Token invalide');
      }

      const hashedPassword = await this.hashService.hashPassword(dto.password);

      // Mettre à jour le mot de passe et réinitialiser le token
      user.password = hashedPassword;
      user.resetPasswordToken = '';
      user.resetPasswordExpires = new Date();
      await this.authRepository.save(user);

      return { message: 'Mot de passe réinitialisé avec succès' };
    } catch {
      throw new UnauthorizedException(
        'Échec de la réinitialisation du mot de passe',
      );
    }
  }
}
