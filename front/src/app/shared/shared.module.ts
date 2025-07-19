import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [
    HeaderComponent,
    MatIconModule, // ✅ Optional but good practice if other modules will use mat-icon
    MatButtonModule, // ✅ Same here
  ],
})
export class SharedModule {}
