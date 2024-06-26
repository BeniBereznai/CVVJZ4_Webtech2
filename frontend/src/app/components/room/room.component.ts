import { Component, OnInit } from '@angular/core';
import { Room } from "../../models/room";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: Room;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.room = this.activatedRoute.snapshot.data['preload'];
  }


}
