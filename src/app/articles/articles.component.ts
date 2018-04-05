import { Component, Input, HostListener, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';


import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { SearchComponent } from '../services/search/search.component';
import { AppComponent } from "../app.component";
import { appendNgContent } from "@angular/core/src/view/ng_content";



import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';


import * as firebase from 'firebase/app';

import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabase } from 'angularfire2/database';
import { UploadService } from '../services/uploads/shared/upload.service';
import { Upload } from '../services/uploads/shared/upload';
import {AngularFireList} from 'angularfire2/database';



declare const window: any;





@Component({
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})




export class ArticleComponent implements OnInit {
    @Input() article: any = "";
    @Input() title: any;

    basePath: any='/glossary';
   // items:AngularFireList<String[]>;
    items: Observable<String[]>;
    itemsRef: AngularFireList<any>;

    selectedFiles: FileList | null;
    currentUpload: Upload;


    pressed:boolean=false; 




    constructor(private af: AngularFireDatabase, private upSvc: UploadService) {

        
    this.itemsRef = af.list(this.basePath);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
      //this.items = af.list(this.basePath);
      console.log(this.items[0]); 
        //add items to the list

        //   this.items[1]= "hi, I am test of push";         
        //  this.af.list('glossary/').push(this.items[1]);

    }
    ngOnInit() {
     
     }



    loadArticle() {

        if (this.article != undefined && this.article != null && this.title != null) {

            const file = new File([""], "filename.txt", { type: "text/plain" });
            this.currentUpload = new Upload(file);
            this.currentUpload.content = { "title": this.title, "content": this.article };    
              this.upSvc.pushUpload(this.currentUpload);
        }
        else {
            alert("Give title and content of the article. Дайте название статьи и ее содержание");
        }

    }












    uploadFile(event) {
        this.selectedFiles = (event.target as HTMLInputElement).files;
        console.log("upload goes");
        var f = event.target.files[0]; // FileList object

        // use the 1st file from the list
        var text = "";

        var reader = new FileReader();
        // reader.readAsText(files, "UTF-8");
        var textType = /text.*/;
        if (f.type.match(textType)) {
            reader.onloadend = (e) => {
                console.log(reader.result);
                text = reader.result;
                this.article = text;
                this.uploadMulti();
            };
            reader.readAsText(f);

        }
        else {
            console.log("not a right data format");
        }
    }




    uploadMulti() {


        const files = this.selectedFiles;
        if (!files || files.length === 0) {
            //    console.log('No Multi Files found!');
            return;
        }

        Array.from(files).forEach((file) => {
            this.currentUpload = new Upload(file);
            if (this.article != undefined && this.article != null) {
                this.currentUpload.content = this.article; 
            }
            this.upSvc.pushUpload(this.currentUpload);
        });
    }


    showUpload(){
        console.log("upload iiiii"); 
        this.pressed=true;
    }
    closeUpload(){
        this.pressed=false; 
    }


}
