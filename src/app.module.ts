import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteHeadModule } from './note-head/note-head.module';
import { FirebaseFuncModule } from './firebase-func/firebase-func.module';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';

@Module({
  imports: [NoteHeadModule, FirebaseFuncModule],
  controllers: [AppController],
  providers: [AppService, FirebaseFuncService],
})
export class AppModule {
}
