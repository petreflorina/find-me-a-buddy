import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

import {ApiService} from "../_services/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Country} from "../_models/countries";
import {City} from "../_models/city";
import {Hobby} from "../_models/hobby";
import {IMyDpOptions} from "mydatepicker";

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    length = 0;
    selectedHobbies = [];
    nrHobbies = 5;
    controls: any;
    save = false;
    invalidHobbies = false;
    countries: Array<Country> = [];
    cities: Array<City> = [];
    country: {
        countryId: 1;
    };
    city: {};
    hobbies: Array<Hobby> = [];
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
    };


    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private apiService: ApiService,
                private modalService: NgbModal) {
    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            profile: this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                birthday: null,
                gender: [''],
                city: [''],
                country: [''],
                hobbies: this.formBuilder.array([])
            })
        });

        this.getCountry();
        this.getHobbies();
    }

    formatDate(value) {
        this.p['birthday'].setValue(<string>value.formatted);
    }

    formatCity(value) {
        this.p['city'].setValue({cityId: value.cityId});
    }

    formatCountry(value) {
        this.p['country'].setValue({countryId: value.countryId});
    }

    initHobby(hobbyId) {
        return this.formBuilder.group({
            hobbyId: [hobbyId]
        });
    }

    addHobby(hobbyId) {
        const control = <FormArray>this.registerForm['controls'].profile['controls'].hobbies;
        const hobbyCtrl = this.initHobby(hobbyId);
        control.push(hobbyCtrl);
    }

    removeHobby(hobbyId) {
        const control = <FormArray>this.registerForm['controls'].profile['controls'].hobbies;
        control['controls'].forEach((value, index) => {
            let hobbyGroup = <FormGroup>value;
            if (hobbyGroup.get('hobbyId').value == hobbyId) {
                control.removeAt(index);
            }
        });
    }

    public getCountry() {
        this.apiService.getCountries().subscribe((response: Array<Country>) => {
            this.countries = response;
        });
    }

    public getCities(countryId) {
        this.apiService.getCities(countryId).subscribe((response: Array<City>) => {
            this.cities = response;
        });
    }

    public getHobbies() {
        this.apiService.getHobbies().subscribe((response: Array<Hobby>) => {
            this.hobbies = response;
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    get p() {
        return this.f['profile']['controls'];
    }

    open(content) {
        this.modalService.open(content, {size: 'lg'});
    }

    setCities() {
        if (this.country) {
            this.getCities(this.country.countryId);
        }
    }

    checkboxChange(event, hobbyId) {
        if (event.target.checked) {
            if (!this.selectedHobbies.some((item) => item == hobbyId)) {
                this.selectedHobbies.push(hobbyId);
                this.addHobby(hobbyId);
            }
        } else {
            if (this.selectedHobbies.some((item) => item == hobbyId)) {
                this.removeHobby(hobbyId);
                let index = this.selectedHobbies.indexOf(hobbyId);
                this.selectedHobbies.splice(index, 1);
            }
        }
    }

    saveModal() {
        this.save = true;
        this.invalidHobbies = true;
        if (this.selectedHobbies.length == this.nrHobbies) {
            this.modalService.dismissAll('Save click');
            this.invalidHobbies = false;
        }
    }

    onSubmit() {
        this.submitted = true;

        if (!(this.selectedHobbies.length == this.nrHobbies)) {
            this.invalidHobbies = true;
            return;
        }


        if (this.p['birthday'].value) {
            this.formatDate(this.p['birthday'].value);
        }
        if (this.p['city'].value) {
            this.formatCity(this.p['city'].value);
        }
        if (this.p['country'].value) {
            this.formatCountry(this.p['country'].value);
        }

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.warn('Form invalid');
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
