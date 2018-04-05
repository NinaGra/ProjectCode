import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UploadService } from './upload.service';




// const routes: Routes = [
//     { path: '', component: UploadFormComponent }
    
//   ]


@NgModule({
    imports: [
        CommonModule,
      //  RouterModule.forChild(routes)
    ],
    declarations: [],
    providers: [
        UploadService
    ],
})
export class UploadModule { }