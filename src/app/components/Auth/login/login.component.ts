import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
type LoginData = {
  email: string;
  password: string;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginData: LoginData[] = [];
  detailForm!: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.detailForm = this.createForm();
  }

  ngOnInit(): void {
    this.inputLoginData();
    this.detailForm = this.createForm();
  }
  onSubmit() {
    this.markFormGroupTouched(this.detailForm);
    if (this.detailForm.valid) {
      const value = this.detailForm.getRawValue();

      if (value) {
        this.loginData.forEach((data) => {
          if (data.email === value.email && data.password === value.password) {
            localStorage.setItem(
              'token',
              JSON.stringify(this.detailForm.getRawValue())
            );
            this.router.navigate(['/']);
            this.errorMessage = null;
          } else {
            this.errorMessage = 'Wrong email or password';
          }
        });
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }


  createForm() {
    return this.formBuilder.group({
      email: ['martin@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.compose([Validators.required])],
      termAndCondition: ['', Validators.compose([Validators.requiredTrue])],
    });
  }

  inputLoginData() {
    const data = [
      {
        email: 'martin@gmail.com',
        password: '123456',
      },
      {
        email: 'priyo@gmail.com',
        password: '123456',
      },
      {
        email: 'aldy@gmail.com',
        password: '123456',
      },
    ];
    this.loginData = data;
  }

  onInputChange() {
    // Sembunyikan pesan kesalahan saat nilai input berubah
    if (this.errorMessage && this.errorMessage !== '') {
      this.errorMessage = null;
    }
  }

  //  updateSelectedJutsu(event: any) {
  //   const checkbox = event.target;
  //   const value = checkbox.value;

  //   if (checkbox.checked) {
  //     this.formValues.jutsu.push(value);
  //   } else {
  //     const index = this.formValues.jutsu.indexOf(value);
  //     if (index !== -1) {
  //       this.formValues.jutsu.splice(index, 1);
  //     }
  //   }
  // }
}
