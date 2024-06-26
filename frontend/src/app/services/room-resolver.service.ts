import { Injectable } from '@angular/core';
import { Room } from "../models/room";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RoomService } from "./room.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomResolver implements Resolve<Room> {
  constructor(private roomService: RoomService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Room> {
    return this.roomService.getRoomById((route.params['id']));

  }
}
