import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      subject: [''],
      message: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {

    if (this.contactForm.invalid) {
      return ;
    }
    let name = this.f.name.value;
    let email = this.f.email.value;
    let subject = this.f.subject.value;
    let message = this.f.message.value;

    this.http.post(`/mail/`, { name, email, subject, message }, { observe: 'response'})
    .subscribe(res => {
      console.log(res);
    })
  }

}
