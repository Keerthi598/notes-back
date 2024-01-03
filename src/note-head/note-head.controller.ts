import { Controller, Get, Post } from "@nestjs/common";
import { NoteHeadService } from "./note-head.service";

@Controller()
export class NoteHeadController {
    constructor(private noteHeadService: NoteHeadService) {}
}