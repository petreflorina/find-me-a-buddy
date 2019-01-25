import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

import {ApiService} from "../_services/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Country} from "../_models/countries";
import {City} from "../_models/city";

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
    hobbiesControls: any;
    save = false;
    invalidHobbies = false;
    countries: Array<Country> = [];
    cities: Array<City> = [];
    country: {
        countryId: 1;
    };
    city: {};
    hobbies = [
        {id: 1, link: 'assets/theme/img/hobbies/cycling.jpeg'},
        {id: 2, link: 'assets/theme/img/hobbies/photo.jpeg'},
        {id: 3, link: 'assets/theme/img/hobbies/golf.jpeg'},
        {id: 4, link: 'assets/theme/img/hobbies/basket.jpeg'},
        {id: 5, link: 'assets/theme/img/hobbies/basket.jpeg'},
        {id: 6, link: 'assets/theme/img/hobbies/basket.jpeg'}
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

        this.getCountry();
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

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    open(content) {
        this.modalService.open(content, {size: 'lg'});
    }

    setCities() {
        if (this.country) {
            this.getCities(this.country.countryId);
        }
    }

    checkboxChange(event, i) {
        this.hobbiesControls = this.getControls(this.registerForm, 'hobbies');
        let hobbyId = this.hobbies[i].id;
        if (event.target.checked) {
            this.hobbiesControls[i].setValue(hobbyId);
            if (!this.selectedHobbies.some((item) => item == hobbyId)) {
                this.selectedHobbies.push(hobbyId);
            }
        } else {
            if (this.selectedHobbies.some((item) => item == hobbyId)) {
                let index = this.selectedHobbies.indexOf(hobbyId);
                this.selectedHobbies.splice(index, 1);
            }
        }
    }

    getControls(frmGrp: FormGroup, key: string) {
        return (<FormArray>frmGrp.controls[key]).controls;
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
