import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: 'finder.component.html',
    providers: [NgbCarouselConfig]
})
export class FinderComponent implements OnInit {
    showNavigationArrows = false;
    showNavigationIndicators = false;
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor(config: NgbCarouselConfig, private _http: HttpClient) {
        // customize default values of carousels used by this component tree
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
    }

    ngOnInit() {
    }
}
