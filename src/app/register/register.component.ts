import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {ApiService} from '../_services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    hobbies = [
        {id: 1, link: 'assets/theme/img/hobbies/cycling.jpeg'},
        {id: 2, link: 'assets/theme/img/hobbies/photo.jpeg'},
        {id: 3, link: 'assets/theme/img/hobbies/golf.jpeg'},
        {id: 4, link: 'assets/theme/img/hobbies/basket.jpeg'}
    ];


    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private apiService: ApiService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        const controls = this.hobbies.map(c => new FormControl(null));

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            city: [''],
            country: [''],
            hobbies: new FormArray(controls),
            birthday: [''],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    open(content) {
        this.modalService.open(content, {size: 'lg'});
    }

    checkboxChange(event, i) {
        const hobbiesControls = this.getControls(this.registerForm, 'hobbies');
        if (event.target.checked)
            hobbiesControls[i].setValue(this.hobbies[i].id);
    }

    getControls(frmGrp: FormGroup, key: string) {
        return (<FormArray>frmGrp.controls[key]).controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.apiService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    alert('Error');
                    this.loading = false;
                });
    }
}
