import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'animateLoadingDirective';

  paginate = new BehaviorSubject<{ limit: number; offset: number }>({
    limit: 10,
    offset: 0,
  });
  pokemons = this.paginate.pipe(
    map((paginate) => this.queryImages(paginate.offset, paginate.limit))
  );

  constructor() {}

  prevPage() {
    const { limit, offset } = this.paginate.getValue();
    if (offset - limit >= 0) {
      this.paginate.next({ limit, offset: offset - limit });
    }
  }

  nextPage() {
    const { limit, offset } = this.paginate.getValue();
    this.paginate.next({ limit, offset: offset + limit });
  }

  queryImages(offset: number, limit: number) {
    return Array.from({ length: limit }, (_, index) => {
      let imageNumber = `${offset + index + 1}`;
      imageNumber = `0`.repeat(3 - imageNumber.length) + imageNumber;
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageNumber}.png`;
    });
  }
}
