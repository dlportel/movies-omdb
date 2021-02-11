import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainHomeComponent} from './main-home.component';
import {MovieService} from '../../../../core/classes/movie.service';
import {MockMovieService} from '../../../../mocks/mock-movie.service';
import {HttpClientModule} from '@angular/common/http';
import {UtilService} from '../../../../core/classes/utils.service';
import {MaterialUtilsService} from '../../../../services/material-utils.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

fdescribe('MainHomeComponent', () => {
  let component: MainHomeComponent;
  let fixture: ComponentFixture<MainHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [
        MainHomeComponent,
        {provide: MovieService, useClass: MockMovieService},
        {provide: UtilService, useClass: MaterialUtilsService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('itemsStorage should not have values after construction', () => {
    expect(component.itemsStorage).toHaveSize(0);
  });

  // it('should have the key value > Testing_mock', waitForAsync(() => {
  //   const fixture = TestBed.createComponent(MainHomeComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.itemsAmount).toEqual('Testing_mock');
  // }));

});
