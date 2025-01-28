import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './store/dummy-store';
import { CrudActions } from './store/dummy-store/action';
import { selectAllUsers } from './store/dummy-store/selecter';
import { take } from 'rxjs';
import { ApiService } from './shared/_services';

const userActions = new CrudActions<User>('User');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements AfterViewInit{
  title = 'CrudByNgAndDotNet';
  constructor(private store: Store,private api:ApiService) {}
ngAfterViewInit(): void {
  this.loadUsers();
}
  loadUsers() {
    this.store.dispatch(userActions.load());
    this.store.dispatch(userActions.loadSuccess({data:[{  id: "Enamul",
      name: "Badshah",
      email: "enamulcs008@gmail.com"}]}));
    this.store.select(selectAllUsers).pipe(take(1)).subscribe(res=>{
      console.log("Response of post", res);
      
    })
  }

  addUser(user: User) {
    this.store.dispatch(userActions.create({ data: user }));
  }

  updateUser(id: string, changes: Partial<User>) {
    this.store.dispatch(userActions.update({ id, changes }));
  }

  deleteUser(id: string) {
    this.store.dispatch(userActions.delete({ id }));
  }
}
