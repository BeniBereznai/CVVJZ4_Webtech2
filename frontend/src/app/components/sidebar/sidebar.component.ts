import { Component } from '@angular/core';
import { RegisterDialogComponent } from "../register/register-dialog/register-dialog/register-dialog.component";
import { LoginDialogComponent } from "../login/login-dialog/login-dialog/login-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isLoggedIn: boolean;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Login successful');
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      }
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registration successful');
        this.router.navigate(['/home']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
