import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RoomComponent } from './components/room/room.component';
import { BookingComponent } from './components/booking/booking.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RoomCardComponent } from './components/room/room-card/room-card.component';
import { RoomListComponent } from './components/room/room-list/room-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingTableComponent } from './components/booking/booking-table/booking-table.component';
import { BookingDialogComponent } from './components/booking/booking-dialog/booking-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register/register-dialog/register-dialog/register-dialog.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { AuthInterceptor } from "./services/auth-interceptor";
import { ViewProfileComponent } from './components/user/view-profile/view-profile.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewBookingsComponent } from './components/booking/view-bookings/view-bookings/view-bookings.component';
import { MatTableModule } from "@angular/material/table";
import { RoomRatesChartComponent } from './components/room/room-rates-chart/room-rates-chart/room-rates-chart.component';
import { BaseChartDirective } from "ng2-charts";
// // @ts-ignore
// import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomComponent,
    BookingComponent,
    HomeComponent,
    SidebarComponent,
    RoomCardComponent,
    RoomListComponent,
    BookingTableComponent,
    BookingDialogComponent,
    LoginComponent,
    RegisterComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ViewProfileComponent,
    ViewBookingsComponent,
    RoomRatesChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BaseChartDirective,
    // NgChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
