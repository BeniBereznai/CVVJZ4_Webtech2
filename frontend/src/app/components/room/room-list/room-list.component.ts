import { Component, OnInit } from '@angular/core';
import { Room } from "../../../models/room";
import { RoomService } from "../../../services/room.service";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {


  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(data => {
      this.rooms = data;
    });
  }
}
