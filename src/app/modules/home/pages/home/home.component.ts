import { Component } from '@angular/core';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { UsersService } from '../../../../shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public isLoadingData: boolean = true;
  public breakpoint: number = (window.innerWidth <= 767) ? 2 : 4;
  public users: IUser[] = [];
  public allUsers: IUser[] = [];
  public selectedUser!: IUser;

  constructor(
    private userService: UsersService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void  {
    this.userService.getUsers()
        .subscribe((response: IUser[]) => {
          this.allUsers = response;
          this.users = response;
          this.toast.success('Data loaded successfully!', 'Success');
        }, err => {
          this.toast.error('Error while loading dataan error occurred while loading data', 'Error');
        }, () => {
          this.isLoadingData = false;
        });
  }

  public onSearch(event: any): void {
    const value: string = (event.target.value || '').toLowerCase();
    let usersList: IUser[] = this.allUsers;

    if (value.length > 0) {
      usersList = this.users.filter(item => item.name.toLowerCase().indexOf(value) > -1);
    }

    this.users = usersList;
  }

  public onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 767) ? 2 : 4;
  }

  get hasUsers(): boolean {
    return this.users?.length > 0;
  }
}
