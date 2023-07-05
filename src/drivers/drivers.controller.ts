import { Controller, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@Controller('drivers')
//@UseGuards(FirebaseAuthGuard)
export class DriversController {
    constructor(
        private readonly driverService: DriversService,
    ) {}

}
