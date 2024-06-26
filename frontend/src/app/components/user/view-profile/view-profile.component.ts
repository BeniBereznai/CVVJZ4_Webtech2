import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../models/user";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @ViewChild('editProfileDialog') editProfileDialog: TemplateRef<any>;

  user: User;
  passwordForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private readonly fb: FormBuilder,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.user = this.activatedRoute.snapshot.data['preload'];
  }

  initForm() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  openDialog(): void {
    let dialogRef = this.dialog.open(this.editProfileDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

  updateUser() {
    this.dialog.closeAll();
    if (this.passwordForm.valid) {
      this.userService.updateUserPwd(this.passwordForm.value.password).subscribe();
    }
  }

  deleteUser() {
    this.userService.deleteUser().subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    });
  }

}
