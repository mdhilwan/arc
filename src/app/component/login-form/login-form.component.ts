import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
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
