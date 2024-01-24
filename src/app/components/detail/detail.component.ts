import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/DataService/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailEmployee } from '../../shared/models/employee.model';
import { CurrencyPipe } from '@angular/common';
import { validateAge } from '../../shared/validations/ValidationAge';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  detailEmployee: DetailEmployee | null = null;
  isEditing: boolean = false;
  employeeForm!: FormGroup;
  search : string | null = null;
  id : string | null = null;
  page : number = 1;
  constructor(
    private formBuilder: FormBuilder,
    private _service: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.employeeForm = this.createForm();
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams['id'];
      this.search = queryParams['search'];
      this.page = queryParams['page'];
    });
    if (this.id && this.id !== '') {
      this.getEmployee();
    }
    else{
      this.router.navigate(["/input"]);
      this.isEditing = true;
    }
  }
  getEmployee() {
    this._service.getEmployee(this.id)
    .subscribe({
      next: (result) => {
        this.detailEmployee = result[0];
        if(this.detailEmployee?.id === undefined){
          this.router.navigate(['/NotFound']);
          return;
        }
        this.formatBirthDate();
        this.employeeForm = this.createForm();
        this.disableForm();
      },
      error: (error) => {
        console.log(error)
      }
    });

    // const result = await this._service.getEmployee(this.id);
    // if (!result) {
    //   return;
    // }
  }

  formatBirthDate() {
    if (this.detailEmployee && this.detailEmployee.birthDate) {
      const dateParts = this.detailEmployee.birthDate.split('/');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        this.detailEmployee.birthDate = `${year}-${month}-${day}`;
      }
    }
  }

  createForm() {
    return this.formBuilder.group({
      username: [
        this.detailEmployee?.username ?? '',
        Validators.compose([Validators.required]),
      ],
      firstName: [
        this.detailEmployee?.firstName ?? '',
        Validators.compose([Validators.required]),
      ],
      lastName: [this.detailEmployee?.lastName ?? '', Validators.compose([])],
      email: [
        this.detailEmployee?.email ?? '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      birthDate: [
        this.detailEmployee?.birthDate ?? '',
        Validators.compose([Validators.required, validateAge(18)]),
      ],
      basicSalary: [
        (this.detailEmployee?.basicSalary) ?? '',
        Validators.compose([Validators.required, Validators.min(50000)]),
      ],
      status: [
        this.detailEmployee?.status ?? 1,
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      group: [
        this.detailEmployee?.group ?? '',
        Validators.compose([Validators.required]),
      ],
      description: [
        this.detailEmployee?.description ?? '',
        Validators.compose([]),
      ],
    });
  }

  cancelEdit() {
    this.getEmployee();
    this.disableForm();
  }
  disableForm() {
    this.isEditing = false;
    this.employeeForm.disable();
  }

  enableForm() {
    this.isEditing = true;
    this.employeeForm.enable();
  }
  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }
  submitSave() {
    this.markFormGroupTouched(this.employeeForm);
    if (this.employeeForm.valid) {
      const value = this.employeeForm.getRawValue();
      if (value) {
        const value = this.employeeForm.getRawValue();
        if(this.id && this.id !== ''){
          const detailEmployee = { ...value, id: this.detailEmployee?.id };
          this._service.updateEmployee(detailEmployee).subscribe({
            next: (result) => {
              this.getEmployee();
              this.disableForm();
            },
            error: (error) => {
              console.log(error)
            }
          });
        }
        else{
          const newEmployee = { ...value};
          this._service.addEmployee(newEmployee).subscribe({
            next: (result) => {
              this.employeeForm.reset();
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      }
    }
  }

  backToList() {
    this.router.navigate(['/'], {
      queryParams: { search: this.search, page: this.page },
    });
  }

  grupData: string[] = [
    'Frontend',
    'Backend',
    'FullStack',
    'Mobile',
    'DevOps',
    'UI/UX',
    'Data Scientist',
    'Data Analyst',
    'Data Engineer',
    'Data Architect',
  ]
}
