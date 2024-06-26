import { Component, OnInit } from '@angular/core';
import { Room } from "../../../models/room";
import { Booking } from "../../../models/booking";
import { MatDialog } from "@angular/material/dialog";
import { BookingDialogComponent } from "../booking-dialog/booking-dialog.component";
import { AuthService } from "../../../services/auth.service";
import { RoomService } from "../../../services/room.service";
import { BookingService } from "../../../services/booking.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.css']
})
export class BookingTableComponent implements OnInit {
  rooms: Room[] = [];
  hours: string[] = ['10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22'];

  bookings: { [key: number]: { [key: string]: Booking } } = {};
  booking: Booking = new Booking();
  isLoggedIn: boolean;
  bookingArr: Booking[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly roomService: RoomService,
    private readonly bookingService: BookingService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.loadRooms();
    this.loadBookings();
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe(res => {
      this.rooms = res;
    });
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe(res => {
      this.bookingArr = res;
      this.populateBookings();
    });
  }

  populateBookings() {
    this.bookingArr.forEach(booking => {
      // @ts-ignore
      const roomId = booking.room.id;
      const hourRange = `${booking.startTime}-${booking.endTime}`;
      if (!this.bookings[roomId]) {
        this.bookings[roomId] = {};
      }
      let newBook = new Booking();
      newBook.bookingName = booking.bookingName;
      newBook.startTime = booking.startTime;
      newBook.endTime = booking.endTime;
      newBook.roomId = roomId;
      this.bookings[roomId][hourRange] = newBook;
    });
  }

  openBookingDialog(room: Room, hour: string): void {
    if (!this.isLoggedIn) {
      return;
    }

    const [startHour, endHour] = hour.split('-').map(h => parseInt(h, 10));

    const newBooking = new Booking();
    newBooking.roomId = room.id;
    newBooking.startTime = startHour;
    newBooking.endTime = endHour;

    const hourRange = `${newBooking.startTime}-${newBooking.endTime}`;
    if (this.bookings[newBooking.roomId] && this.bookings[newBooking.roomId][hourRange] != null) {
      this.showSnackbar('Erre az időpontra már nem foglalhatsz!');
      return;
    }


    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '300px',
      data: { room, hour, booking: newBooking }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.bookings[room.id]) {
          this.bookings[room.id] = {};
        }
        console.log(result);
        this.bookings[room.id][hour] = result;
      }
    });
  }
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Bezárás', {
      duration: 3000,
    });
  }

}

