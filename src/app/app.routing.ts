import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { VideoComponent } from './videos/video.component';
import { ArticleComponent } from './articles/articles.component';
import { InjectionToken } from '@angular/core';
import { AnekdotComponent } from './anekdots/anekdots.component';





export const appRoutes: Routes = [
    { path: '', component: VideoComponent, pathMatch: 'full' },
    { path: 'allVideos', component: VideoComponent },
    { path: 'allArticles', component: ArticleComponent },
    { path: 'anekdots', component: AnekdotComponent }


]




export const appRouting = RouterModule.forRoot(appRoutes);

export const routingComponents = [VideoComponent, AppComponent, ArticleComponent, AnekdotComponent];







