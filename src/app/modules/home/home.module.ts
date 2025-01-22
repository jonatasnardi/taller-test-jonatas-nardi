import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class HomeModule { }
