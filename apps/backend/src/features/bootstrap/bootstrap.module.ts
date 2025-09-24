import { Module } from '@nestjs/common';

import { IAMModule } from 'features/iam/iam.module';

import { BootstrapService } from './application/bootstrap.service';

@Module({
  imports: [IAMModule],
  providers: [BootstrapService],
})
export class BootstrapModule {}
