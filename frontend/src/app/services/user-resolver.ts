import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { User } from "../models/user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User> {
    return this.userService.getCurrentUser();
  }
}
