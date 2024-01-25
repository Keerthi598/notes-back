import { Module } from '@nestjs/common';
import { FirebaseFuncController } from './firebase-func.controller';
import { FirebaseFuncService } from './firebase-func.service';
import axios from 'axios';

@Module({
    imports: [],
    controllers: [FirebaseFuncController],
    providers: [FirebaseFuncService],
})
export class FirebaseFuncModule {
}

