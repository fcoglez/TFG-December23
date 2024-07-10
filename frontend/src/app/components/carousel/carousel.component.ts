import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

   items = [
    {
      image: '../../../assets/images/carousel1.jpg',
      altText: 'Slide 1',
      caption: 'Caption 1'
    },
    {
      image: '../../../assets/images/carousel2.jpg',
      altText: 'Slide 2',
      caption: 'Caption 2'
    },
    {
      image: '../../../assets/images/carousel3.jpg',
      altText: 'Slide 3',
      caption: 'Caption 3'
    }
  ];
}
