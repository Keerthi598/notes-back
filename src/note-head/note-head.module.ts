import { Module } from '@nestjs/common';
import { NoteHeadController } from './note-head.controller';
import { NoteHeadService } from './note-head.service';

@Module({
    imports: [],
    controllers: [NoteHeadController],
    providers: [NoteHeadService],
})
export class NoteHeadModule {}
