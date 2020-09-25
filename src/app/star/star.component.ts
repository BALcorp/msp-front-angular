import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({ // Component decorator
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

  @Input() rating: number;
  starWidth: number;

  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    // L'affiche en px de mes étoiles est calculé en fonction de la notation du parent depuis
    // @Input() rating
    this.starWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    console.log('click');
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }

}
