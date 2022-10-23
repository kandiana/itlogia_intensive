import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

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

  carsData: any = [];

  constructor(private fb: FormBuilder, private appService: AppService) {
  };

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  goScroll(target: HTMLElement, car?: carData) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name})
    }
  };

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

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
      this.appService.sendQuery(this.priceForm.value)
        .subscribe({
          next: (response: any) => {
            alert(response.message);
            this.priceForm.reset();
          },
          error: (response: any) => {
            alert(response.error.message);
          },
        });
    }
  };
}
