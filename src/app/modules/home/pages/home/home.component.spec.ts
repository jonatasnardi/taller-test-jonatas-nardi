import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UsersService } from '../../../../shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { USERS_MOCK } from '../../../../shared/mocks/user.mock';
import { ComponentsModule } from '../../../../components/components.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UsersService', ['getUsers']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        ComponentsModule,
      ],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadData', () => {
      spyOn(component as any, 'loadData');
      component.ngOnInit();
      expect((component as any).loadData).toHaveBeenCalled();
    });
  });

  describe('loadData', () => {
    it('should load users and display a success message', () => {
      const mockUsers: IUser[] = USERS_MOCK;
      mockUserService.getUsers.and.returnValue(of(mockUsers));

      (component as any).loadData();

      expect(mockUserService.getUsers).toHaveBeenCalled();
      expect(component.allUsers).toEqual(mockUsers);
      expect(component.users).toEqual(mockUsers);
      expect(mockToastrService.success).toHaveBeenCalledWith('Data loaded successfully!', 'Success');
      expect(component.isLoadingData).toBeFalse();
    });
  });

  describe('onSearch', () => {
    it('should reset users when the search term is empty', () => {
      const mockUsers: IUser[] = USERS_MOCK;
      component.allUsers = mockUsers;
      component.users = mockUsers;

      const event = { target: { value: '' } };
      component.onSearch(event);

      expect(component.users).toEqual(mockUsers);
    });
  });

  describe('onResize', () => {
    it('should update the breakpoint based on window width', () => {
      const event = { target: { innerWidth: 500 } };
      component.onResize(event);
      expect(component.breakpoint).toBe(2);

      const largeEvent = { target: { innerWidth: 1024 } };
      component.onResize(largeEvent);
      expect(component.breakpoint).toBe(4);
    });
  });

  describe('hasUsers getter', () => {
    it('should return true if there are users', () => {
      component.users = USERS_MOCK;
      expect(component.hasUsers).toBeTrue();
    });

    it('should return false if there are no users', () => {
      component.users = [];
      expect(component.hasUsers).toBeFalse();
    });
  });
});