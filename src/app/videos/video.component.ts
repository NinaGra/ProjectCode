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
import { AngularFireList } from 'angularfire2/database';



import { AngularFireDatabase } from 'angularfire2/database';
import { UploadService } from '../services/uploads/shared/upload.service';
import { Upload } from '../services/uploads/shared/upload';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


import { AngularFireAction } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';




declare const window: any;


@Component({
  selector: 'videos',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']

})
export class VideoComponent {
  @Input() anekdot: String = "";

  @Input() article: any = "";
  @Input() title: any;
  @Input() url: any = "/mABclWASucs";

  basePath: any = '/video';
  basetPathAnekdot: any = '/anekdot';

  // items: AngularFireList<String[]>;
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  itemsAnek: Observable<any[]>;
  itemsAnekRef: AngularFireList<any>;


  selectedFiles: FileList | null;
  currentUpload: Upload;

  dangerousUrl: string;
  trustedUrl: SafeUrl;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;
  itemsImages: string = "";
  show: boolean = false;
  clicked: boolean = false;


  constructor(private af: AngularFireDatabase, private upSvc: UploadService, private sanitizer: DomSanitizer) {



    this.itemsRef = af.list(this.basePath);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this.itemsAnekRef = this.af.list(this.basetPathAnekdot);
    this.itemsAnek = this.itemsAnekRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.dangerousUrl = 'https://www.youtube.com/embed/mABclWASucs';

    this.url = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);






    //add items to the list

    //   this.items[1]= "hi, I am test of push";         
    //  this.af.list('glossary/').push(this.items[1]);

  }
  ngOnInit() {

    let src = "../../assets/greetingRodion.ogg";
    let audio1 = new Audio();
    audio1.addEventListener('load', function () {
      audio1.play();
    }, true);

    audio1.src = src;
    audio1.autoplay = true;



    src = "../../assets/greetingNina.ogg";
    let audio2 = new Audio();
    audio2.addEventListener('ended', function () {
      audio2.pause();

    }, true);
    audio2.src = src;

    audio1.onended = function() {
      console.log("audio1 ended");
      audio2.play();
      audio2.autoplay = true;
    }

  



  $(document).ready(function() {
    $("#audio2").click(function () {

    });

  });

}



loadArticle() {

  if (this.article != undefined && this.article != null && this.title != null && this.url != null) {

    const file = new File([""], "filename.txt", { type: "text/plain" });
    this.currentUpload = new Upload(file);
    this.currentUpload.content = { "title": this.title, "content": this.article, "url ": this.url };
    this.upSvc.pushUpload(this.currentUpload);
  }
  else {
    alert("Give title and content of the article. Дайте название статьи и ее содержание");
  }
}

loadAnekdot() {

  this.clicked = true;
  //this.items = af.list(this.basePath);
  this.itemsAnek.subscribe(data => {
    if (this.clicked) {
      let index = Math.floor(Math.random() * data.length);
      if (data[index]['title'] == 'anekdotImage') {
        this.itemsImages = data[index]['content'];
        this.anekdot = null;
        this.show = true;
      }
      else {
        this.anekdot = data[index]['content'];
        this.show = false;
      }
      this.clicked = false;
      return;
    }
  });



}




  public checkUrl(url: any): any {
  console.log("check Url : " + url);
  this.dangerousUrl = url;
  this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
  return this.trustedUrl;
}

  public getStyle() {
  if (this.anekdot.length < 50) {
    return 30;
  }
  else {
    return this.anekdot.length / 1.8;
  }

}

}
