import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class MaterialModule { }