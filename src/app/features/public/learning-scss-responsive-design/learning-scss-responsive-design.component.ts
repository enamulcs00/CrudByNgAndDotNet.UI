import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-learning-scss-responsive-design',
  templateUrl: './learning-scss-responsive-design.component.html',
  styleUrls: ['./learning-scss-responsive-design.component.scss'],
   imports: [CommonModule],
})
export class LearningScssResponsiveDesignComponent implements OnInit {
observable!:Observable<number>;
values:number[] = [];
value:number = 1;
  constructor() { }

  ngOnInit() {
  }
Observ():void{
  this.value +=1;
   this.observable = new Observable((subscriber) => {
    subscriber.next(this.value);
    if(this.value === 3){
      subscriber.complete();
    }
  });
}
ShowAll():void{
  this.observable.subscribe({
    next: (x) => console.log('got values ',  this.values.push(x), this.values),
  }); 
}
valueGetter():string{
  return this.values.toString();  
}
}
