import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class WelcomeComponent implements OnInit {

  images = ['../assets/pictures/homes_pictures/home4/photo2.png', '../assets/pictures/homes_pictures/home3/photo2.png', '../assets/pictures/homes_pictures/home2/photo2.png', '../assets/pictures/homes_pictures/home4/photo1.png', '../assets/pictures/homes_pictures/home3/photo1.png', '../assets/pictures/homes_pictures/home2/photo1.png'];

  constructor(config: NgbCarouselConfig) {

    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {

  }

}
