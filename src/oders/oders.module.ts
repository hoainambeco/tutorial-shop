import { Module } from '@nestjs/common';
import { OdersResolver } from './oder.resolver';
import { OdersController } from './oders.controller';
import { OdersService } from './oders.service';

@Module({
  controllers: [OdersController],
  providers: [OdersService, OdersResolver],
})
export class OdersModule {}
