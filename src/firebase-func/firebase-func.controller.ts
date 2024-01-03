import { Controller, Get, Post } from "@nestjs/common";
import { FirebaseFuncService } from "./firebase-func.service";

@Controller()
export class FirebaseFuncController {
    constructor(private firebaseFuncService: FirebaseFuncService) {}

    @Get()
    work() {
        this.firebaseFuncService.initializeFirebase();
    }

}