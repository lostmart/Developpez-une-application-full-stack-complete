import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardListComponent } from './components/card-list/card-list.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [HeaderComponent, CardListComponent, CardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    CardListComponent,
    CardComponent,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class SharedModule {}
