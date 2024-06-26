import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { HomeComponent } from "./components/home/home.component";
import { RoomComponent } from "./components/room/room.component";
import { RoomResolver } from "./services/room-resolver.service";
import { BookingComponent } from "./components/booking/booking.component";
import { ViewProfileComponent } from "./components/user/view-profile/view-profile.component";
import { UserResolver } from "./services/user-resolver";
import { AuthGuard } from "./services/auth.guard";
import { ViewBookingsComponent } from "./components/booking/view-bookings/view-bookings/view-bookings.component";
import { BookingResolver } from "./services/booking.resolver";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'room/:id', component: RoomComponent, resolve: { preload: RoomResolver } },
  { path: 'profile', component: ViewProfileComponent, resolve: { preload: UserResolver }, canActivate: [AuthGuard] },
  { path: 'view-bookings', component: ViewBookingsComponent, resolve: { preload: BookingResolver }, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
