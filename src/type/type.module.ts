import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TypeController } from './type.controller';
import { TypeRepository } from './type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRepository]), UserModule],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
