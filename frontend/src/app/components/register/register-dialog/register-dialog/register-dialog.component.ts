import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegisterClick(): void {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password
      ).subscribe(
        (res: any) => {
          this.dialogRef.close(res);
          window.location.reload();
        },
        (error: any) => {
          this.errorMessage = error.error;
          alert(this.errorMessage);
        }
      );
    }
  }

}
