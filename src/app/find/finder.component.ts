import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "../_services/api.service";
import {User} from "../_models/user";

@Component({
    templateUrl: 'finder.component.html',
    providers: [NgbCarouselConfig]
})
export class FinderComponent implements OnInit {
    showNavigationArrows = false;
    showNavigationIndicators = false;
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    users: Array<User>;

    constructor(config: NgbCarouselConfig, private apiService: ApiService) {
        // customize default values of carousels used by this component tree
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
    }

    ngOnInit() {
        this.getMatch();
    }

    public getMatch() {
        let params = new HttpParams().set('locationOffset', '0.1');
        this.apiService.getMatch(params).subscribe(response => {
            console.log(response);
        });
    }
}
