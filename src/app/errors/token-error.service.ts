import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/* A helper class used throughout the project for checking invalid tokens */
@Injectable()
export class TokenErrorService {
    errorChannel = new BehaviorSubject<string>("")
}