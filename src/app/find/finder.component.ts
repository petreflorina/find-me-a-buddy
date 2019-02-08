import {Component, OnInit} from "@angular/core";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {HttpParams} from "@angular/common/http";
import {ApiService} from "../_services/api.service";
import {Account} from "../_models/account";

@Component({
    templateUrl: 'finder.component.html',
    providers: [NgbCarouselConfig]
})
export class FinderComponent implements OnInit {
    showNavigationArrows = false;
    showNavigationIndicators = false;
    users: Array<Account>;
    loading = true;
    showEmail = false;
    index = 0;
    images;

    constructor(config: NgbCarouselConfig, private apiService: ApiService) {
        // customize default values of carousels used by this component tree
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
        config.interval = 0;
    }

    ngOnInit() {
        this.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => `https://randomuser.me/api/portraits/${this.getRandomUser(Math.floor(Math.random() * 10))}.jpg`);
        this.getMatch();
    }

    public getMatch() {
        let params = new HttpParams().set('locationOffset', '0.5').set('maxUsers', '10');
        this.apiService.getMatch(params).subscribe((response: Array<Account>) => {
            this.users = response;
            for (let user of this.users) {
                user.photo = this.images[this.index++];
            }
            this.loading = false;
        });
    }

    public email() {
        this.showEmail = true;
    }

    public onSlide() {
        this.showEmail = false;
    }

    public getRandomUser(id) {
        let randomUser = '';

        let gender = ['men', 'women'];
        let randomNumber = Math.floor(Math.random() * gender.length);
        randomUser += gender[randomNumber] + '/';

        randomUser += id.toString();
        return randomUser;

    }
}
