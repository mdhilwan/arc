import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { KanbanBoardComponent } from './component/kanban-board/kanban-board.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './component/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AnimalCardComponent } from './component/kanban-board/animal-card/animal-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { AnimalBoardComponent } from './component/kanban-board/animal-board/animal-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    DashboardComponent,
    KanbanBoardComponent,
    FooterComponent,
    AnimalCardComponent,
    AnimalBoardComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    DragDropModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressBarModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
