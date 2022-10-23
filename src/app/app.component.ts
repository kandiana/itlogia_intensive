import { Component, HostListener } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

interface carData {
  image: string;
  name: string;
  gear: string;
  engine: number;
  places: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  });

  carsData: carData[] = [
    {
      image: '1.png',
      name: 'Lamborghini Huracan Spyder',
      gear: 'Полный',
      engine: 5.2,
      places: 2
    },
    {
      image: '2.png',
      name: 'Chevrolet Corvette',
      gear: 'Полный',
      engine: 6.2,
      places: 2
    },
    {
      image: '3.png',
      name: 'Ferrari California',
      gear: 'Полный',
      engine: 3.9,
      places: 4
    },
    {
      image: '4.png',
      name: 'Lamborghini Urus',
      gear: 'Полный',
      engine: 4.0,
      places: 5
    },
    {
      image: '5.png',
      name: 'Audi R8',
      gear: 'Полный',
      engine: 5.2,
      places: 2
    },
    {
      image: '2.png',
      name: 'Аренда Chevrolet Camaro',
      gear: 'Полный',
      engine: 2.0,
      places: 4
    },
  ]

  constructor(private fb: FormBuilder) {
  };

  goScroll(target: HTMLElement, car?: carData) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name})
    }
  };

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: 'calc(50% + ' + (0.3 * window.scrollY) + 'px)'};
  }

  onSubmit() {
    if (this.priceForm.valid) {
      alert('Cпасибо за заявку, мы свяжемся с Вами в ближайшее время');
      this.priceForm.reset();
    }
  };
}
