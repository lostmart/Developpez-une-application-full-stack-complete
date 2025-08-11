import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { SingleArticleComponent } from './pages/single-article/single-article.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:articleId', component: SingleArticleComponent },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'articles-new',
    component: NewArticleComponent,
    canActivate: [AuthGuard],
  },

  // Future routes can go here:
  // { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
