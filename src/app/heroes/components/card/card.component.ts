import { Component, Input, type OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  standalone: false,

  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is required');
  }
}
