import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Booking } from "../../../models/booking";
import { BookingService } from "../../../services/booking.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent {
  bookingForm: FormGroup;
  newBooking: Booking;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      bookingName: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.newBooking = this.data.booking;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.bookingForm.valid) {
      this.newBooking.bookingName = this.bookingForm.value.bookingName;

      console.log(this.newBooking);
      this.bookingService.createBooking(this.newBooking).subscribe(res => {
        console.log(res);
        this.snackBar.open("A foglalás sikeresen megtörtént!", 'Bezárás', {
          duration: 3000,
        });

      })
      this.dialogRef.close(this.newBooking);
    }
  }
}

