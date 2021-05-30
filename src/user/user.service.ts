import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    //await this.mailService.sendUserConfirmation();
    return this.userRepository.signUp(userCredentialsDto);
  }

  async signIn(userCredentialsDto: UserCredentialsDto) {
    const { email, firstname, lastname } =
      await this.userRepository.validateUserPassword(userCredentialsDto);

    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { email, firstname, lastname };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
