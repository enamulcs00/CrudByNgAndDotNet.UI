import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { IGetApi } from 'src/app/core/models/general';
import { blogPostActions } from 'src/app/core/ngrx-store';
import { endPoints } from 'src/app/core/routes/endpoints';
import { StoreRepoService } from 'src/app/core';
import { EmptyStateComponent } from 'src/app/shared';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Person {
  name: string;
  age: number;
  year: number;
}

export interface groupResult {
  [year: string]: Person[];
}


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
     imports: [CommonModule, EmptyStateComponent, RouterModule,FormsModule],
})
export class HomeComponent implements OnInit , AfterViewInit{
  // @switchexample start
 title = 'Angular Switch Example';
 @ViewChild(EmptyStateComponent) emptyStateComponent!: EmptyStateComponent;
  // property bound to select dropdown
  color: string = '';

  // you can also predefine some options
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  // @switchexample end


  blogs$?: Observable<BlogPost[]>;
  constructor( private serv:StoreRepoService<BlogPost>) {

  }
  SetValue(num:number):void {

    this.serv.setUser( { id: '1'+num++, firstName: 'zahaz', email:'enamulcs008@gmail.com'});
  
  }
  ngOnInit(): void {

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');

    this.serv.getUser().subscribe(user=>{
      console.log('user from subject',user);
    });
    
    console.log(this.group(),'current', this.serv.getCurrentUser());
    
    let param:IGetApi<BlogPost> = {
                    endPoint:endPoints.blogPost.url,
                    actionName:blogPostActions,
                    force:false,
                    featureName:'blogPost',
                  }
    this.blogs$ = this.serv.getAll(param);
    let input = [
  { name: "a", age: 20, year: 2020 },
  { name: "b", age: 20, year: 2021 },
  { name: "c", age: 20, year: 2020 },
];

let output = input.reduce((acc:any, curr:any) => {
  const year = curr.year;
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(curr);
  return acc;
}, {});

console.log('Group',output);

  }
  
  ngAfterViewInit(): void {
    // link perplexity: https://www.perplexity.ai/search/what-is-the-difference-between-3vryf2.CRcC9XPU8ekkXwA
    const itemList = document.getElementById('itemList');
    itemList?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
// 'target' is asserted as HTMLElement to safely access 'textContent' property.

      if (target.tagName === 'LI') {
        alert(`You clicked on ${target.textContent}`);
      }
    });
    this.emptyStateComponent.sayAlert();
  }
   group(): any {
        let input = [
  { name: "a Group wala", age: 20, year: 2022 },
  { name: "b", age: 20, year: 2021 },
  { name: "c", age: 20, year: 2022 },
];
let result:groupResult = {};
for ( let elem of input){
  let year = elem.year;
  if (!result[year]){
    result[year] = []
  } 
  result[year].push(elem);
}
this.addtwoNumber();
return result;
  };
  addtwoNumber():void {
    let arr = [1,2,3,4,5,5];
   for(let i=0, sum=0; i< arr.length; i++) {
    for(let j=i; j< arr.length; j++) {
        sum = arr[i] + arr[j];
       if(sum === 8) {
        console.log(`Pair found (${arr[i]}, ${arr[j]})`,'sum',sum);
    }
   }
  }

  // let res2 = arr.filter((item,index)=> arr.indexOf(item) === index);
  // console.log(res2);
  
// other way to remove duplicate
let uniqueArr = Array.from(new Set(arr));
console.log(uniqueArr,'uniqueArr');
// more other way to remove duplicate
let str = 'zahaz';

const isPalindrome = (s:any) => {
  // Convert to lowercase to ignore case sensitivity
  s = s.toLowerCase();
  // Reverse the string
  const reversed = s.split('').reverse().join('');
  // Check if the original and reversed strings are the same
  return s === reversed;
};

console.log(isPalindrome(str));  // Output: true or false


  };

}
