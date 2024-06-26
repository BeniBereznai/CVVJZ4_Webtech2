import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Booking } from "../../../../models/booking";

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  displayedColumns: string[] = ['roomId', 'bookingName', 'startTime', 'endTime', ];

  constructor(private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    const bookings = this.activatedRoute.snapshot.data['preload'];

    bookings.forEach((val: Booking) => {
      let book = new Booking();
      book.bookingName = val.bookingName;
      book.startTime = val.startTime;
      book.endTime = val.endTime;
      // @ts-ignore
      book.roomId = val.room.id;
      this.bookings.push(book)
    });
  }

}
