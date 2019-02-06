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

    constructor(config: NgbCarouselConfig, private apiService: ApiService) {
        // customize default values of carousels used by this component tree
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
        config.interval = 0;
    }

    ngOnInit() {
        this.getMatch();
    }

    public getMatch() {
        let params = new HttpParams().set('locationOffset', '0.5').set('maxUsers', '10');
        this.apiService.getMatch(params).subscribe((response: Array<Account>) => {
            this.users = response;
            this.loading = false;
            console.log(this.users);
        });
    }

    public email() {
        this.showEmail = true;
    }

    public onSlide() {
        this.showEmail = false;
    }
}
