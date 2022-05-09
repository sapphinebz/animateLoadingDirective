import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowLoadingImageDirective } from './directives/show-loading-image.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ShowLoadingImageDirective, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [ShowLoadingImageDirective],
})
export class SupportImagesModule {}
