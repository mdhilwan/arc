import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  constructor(private router: Router) { }

  submit() {
    if (this.form.valid) {
      this.router.navigate(['/dashboard'])
    }
  }

}
