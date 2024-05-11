import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { georgianLettersValidator } from '../../shared/georgianLettersValidator';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      georgianLettersValidator(),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    personalid: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    gender: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^5\d{8}$/),
    ]),
    legaladdress: new FormControl('', [Validators.required]),
    currentaddress: new FormControl('', [Validators.required]),
    legalcity: new FormControl('', [Validators.required]),
    currentcity: new FormControl('', [Validators.required]),
    legalcountry: new FormControl('', [Validators.required]),
    currentcountry: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  clientId!: string | undefined;

  radioChangeHandler(value: any) {
    if (value.target.value) {
      this.form.controls['gender'].setValue(value.target.value);
    }
  }

  get firstname() {
    return this.form.controls['firstname'];
  }
  get lastname() {
    return this.form.controls['lastname'];
  }
  get personalid() {
    return this.form.controls['personalid'];
  }
  get gender() {
    return this.form.controls['gender'];
  }
  get phonenumber() {
    return this.form.controls['phonenumber'];
  }
  get legaladdress() {
    return this.form.controls['legaladdress'];
  }
  get currentaddress() {
    return this.form.controls['currentaddress'];
  }
  get legalcity() {
    return this.form.controls['legalcity'];
  }
  get currentcity() {
    return this.form.controls['currentcity'];
  }
  get legalcountry() {
    return this.form.controls['legalcountry'];
  }
  get currentcountry() {
    return this.form.controls['currentcountry'];
  }
  get img() {
    return this.form.controls['img'];
  }

  constructor(
    private clientService: ClientService,
    private Router: Router,
    private NgToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.clientService.currentClient$.subscribe((res) => {
      this.form.patchValue(res!);
      this.clientId = res?.id;
    });

    console.log(this.form);
  }

  onSubmit() {
    if (this.firstname.value) {
      this.clientService
        .editClient(this.clientId, this.form.value)
        .pipe(
          switchMap((res) => {
            this.NgToastService.success({detail: "Success Messege", summary: "Client edited successfully"})
            return this.clientService.getClients();
          })
        )
        .subscribe();
      this.Router.navigate(['/']);
    } else {
      this.clientService
        .addClient(this.form.value)
        .pipe(
          switchMap((res) => {
            this.NgToastService.success({detail: "Success Messege", summary: "Client was created successfully"})
            return this.clientService.getClients();
          })
        )
        .subscribe();

      this.Router.navigate(['/']);
    }
  }
}
