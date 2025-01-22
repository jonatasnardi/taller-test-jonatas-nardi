import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'taller-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item!: IUser;

  constructor() {}

  ngOnInit() {}
}
