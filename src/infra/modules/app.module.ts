import { Module } from '@nestjs/common';
import { UsersModule } from './user.module';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
