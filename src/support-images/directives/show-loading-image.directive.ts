import {
  Directive,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import {
  AsyncSubject,
  first,
  fromEvent,
  merge,
  Observable,
  switchMap,
  takeUntil,
  tap,
  timer,
  zip,
} from 'rxjs';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Directive({
  selector: '[appShowLoadingImage]',
})
export class ShowLoadingImageDirective implements OnDestroy {
  private onDestroy$ = new AsyncSubject<void>();
  get imageEl() {
    return this.el.nativeElement;
  }
  constructor(
    private el: ElementRef<HTMLImageElement>,
    private vc: ViewContainerRef
  ) {
    this.onSrcImageChange()
      .pipe(
        switchMap(() => {
          this.imageEl.hidden = true;
          const componentRef = this.vc.createComponent(LoadingSpinnerComponent);

          const onImageLoaded$ = this.onImageLoaded();

          const delay$ = timer(1000);
          return zip(onImageLoaded$, delay$).pipe(
            tap(() => {
              this.imageEl.hidden = false;
              componentRef.destroy();
            })
          );
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  onSrcImageChange() {
    return new Observable<string>((subscriber) => {
      const mutation = new MutationObserver((observer) => {
        subscriber.next(this.imageEl.src);
      });
      mutation.observe(this.imageEl, {
        attributes: true,
        attributeFilter: ['src'],
      });
      return {
        unsubscribe: () => {
          mutation.disconnect();
        },
      };
    });
  }

  onImageLoaded() {
    const loaded$ = fromEvent(this.el.nativeElement, 'load');
    const error$ = fromEvent(this.el.nativeElement, 'error');
    return merge(loaded$, error$).pipe(first());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
