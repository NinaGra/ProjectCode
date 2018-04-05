import { Component, Input, QueryList, ContentChildren, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IpfsComponent } from "../services/ipfs.component";
import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { HostListener, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { SearchComponent } from '../services/search/search.component';
import { AppComponent } from "../app.component";
import { appendNgContent } from "@angular/core/src/view/ng_content";
import { UploadService } from '../services/uploads/shared/upload.service';
import { Upload } from '../services/uploads/shared/upload';
import { AngularFireList } from 'angularfire2/database';
import * as $ from 'jquery';
import { Location } from '@angular/common';

declare var window: any;



@Component({
    selector: 'anekdots',
    templateUrl: './anekdots.component.html',
    styleUrls: ['./anekdots.component.css']

})
export class AnekdotComponent implements OnInit {

    @Input() anekdot: any;
    @Input() title: any = "";
    basePath: any = '/anekdot';

    //   items: AngularFireList<String[]>;
    itemsRef: AngularFireList<any>;
    items: Observable<String[]>;
    deletedActive: boolean = false;

    selectedFiles: FileList | null;
    currentUpload: Upload;

    pressed: boolean = false;
    text: any;
    sent: boolean = false;

    texttypes = [/text.*/, /application.*/, /image/];
    url: any = "https://firebasestorage.googleapis.com/v0/b/ninagra-ba195.appspot.com/o/anekdot%2F-L9Kz7UekZVSW6xaI7x4?alt=media&token=5a57dedc-695b-4ef7-b2b5-8dcf229d0741";
    index;

    constructor(private af: AngularFireDatabase, private upSvc: UploadService) {


        this.itemsRef = af.list(this.basePath);
        this.items = this.itemsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });


        //     this.items.subscribe(data => {
        //         for(let i=0; i<data.length; i++) {
        //     let tmp =data[i]['content'];
        //     console.log(tmp); 
        //    ///     this.anekdot = tmp;

        //         }
        //     });


    }
    ngOnInit() {
        $(document).ready(function () {
            $("#frame").width('40%');
            $("#frame").height(900);

        });

    }

    loadArticle() {

        if (this.anekdot != undefined && this.anekdot != null) {
            const file = new File([""], "filename.txt", { type: "text/plain" });
            this.currentUpload = new Upload(file);
            this.title = "anekdotText";
            this.currentUpload.content = { "title": this.title, "content": this.anekdot };
            this.upSvc.basePath = this.basePath;
            this.upSvc.pushUpload(this.currentUpload);
            this.anekdot = null;
            this.showMessage();
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


        var reader = new FileReader();
        // reader.readAsText(files, "UTF-8");
        var textType = /text.*/;
        if (f.type.match(this.texttypes[0])) {
            reader.onloadend = (e) => {
                console.log(reader.result);
                this.text = reader.result;
                this.title = "anekdotText";
                // this.anekdot = text;               
                this.uploadMulti();
            };
            reader.readAsText(f);
        }

        if (f.type.match(this.texttypes[2])) {
            reader.onloadend = (e) => {
                // console.log(reader.result);
                this.text = reader.result;
                this.title = "anekdotImage";
                this.uploadMulti();
            };
            reader.readAsDataURL(f);
        }
        else {
            console.log("not a right data format");
            let uploaded = false;
            if (!uploaded) {
                reader.onloadend = (e) => {
                    if (!uploaded)
                        console.log(reader.result);
                    this.text = reader.result;
                    this.title = "anekdotWord";
                    this.basePath = "/uploads/";
                    const files = this.selectedFiles;
                    Array.from(files).forEach((file) => {
                        this.currentUpload = new Upload(file);
                        this.currentUpload.content = { "title": this.title, "content": "" };
                        this.basePath = '/anekdot';
                        this.upSvc.basePath = '/anekdot';
                        //put to the firebase database
                        this.af.list(`${this.basePath}/`).push(this.currentUpload.content);
                        let i = 0;
                        this.items.subscribe(data => {
                            if (i < 1) {
                                let index = data.length - 1;
                                this.currentUpload = new Upload(file);
                                this.currentUpload.content = { "title": this.title, "content": "" };
                                this.upSvc.basePath = '/anekdot/' + data[index]['key'];
                                console.log(data[index]['key']);
                                //put to the firebase storage
                                const storageRef = firebase.storage().ref();
                                const uploadTask = storageRef.child(`${this.basePath}/` + data[index]['key']).put(this.currentUpload.file);
                                i++;
                            }
                        });
                        uploaded = true;
                        this.showMessage();
                    });
                };
                reader.readAsText(f);
            }
        }
    }

    uploadMulti() {
        // atob() for base 64; atob() function decodes a string of data
        // btoa() encodes 64 base 
        const files = this.selectedFiles;
        Array.from(files).forEach((file) => {
            // let tmp = new File([""], "filename.jpg", { type: "image/jpeg" });
            console.log("file " + file);
            this.currentUpload = new Upload(file);
            this.currentUpload.content = { "title": this.title, "content": this.text };
            this.upSvc.basePath = this.basePath;
            this.upSvc.pushUpload(this.currentUpload);
            this.showMessage();

        });
    }


    showMessage() {
        this.sent = true;
        var startTime = new Date().getTime();
        var interval = setInterval(() => {
            if (new Date().getTime() - startTime > 3000) {
                clearInterval(interval);
                this.sent = false;
                return;
            }
            //do whatever here..
        }, 3000);
    }



    deleteItem(item: any) {
        if (this.deletedActive) {
            let result = "";
            this.items.subscribe(data => {
                if (this.deletedActive) {
                    let index = data.length - item - 1;
                    let db = this.af.list("/anekdot/");
                    result = (data[index]['key']);
                    console.log(result);
                    this.af.object('/anekdot/' + result).remove();
                    console.log(result);


                    this.basePath = '/anekdot';
                    const storageRef = firebase.storage().ref();
                    storageRef.child(`${this.basePath}/${result}`).delete()


                    this.deletedActive = false;
                    return;
                }
            });
        }
    }


    setActiveState() {
        this.deletedActive = true;
    }
    cancel() {
        this.deletedActive = false;
    }

    getUrl(index: any) {
        let urlStart = "http://docs.google.com/gview?url=";
        let i = 0;
        let urlPart = "";
        const result = "";
        this.items.subscribe(data => {
            if (i < 1) {
                //   console.log(data[data.length - index - 1]['key']);
                //put to the firebase storage
                const storageRef = firebase.storage().ref();
                const uploadTask = storageRef.child(`${this.basePath}/` + data[data.length - index - 1]['key']);
                uploadTask.getDownloadURL().then(url => {
                    urlPart = url
                    const result = "http://docs.google.com/gview?url=" + urlPart + '&embedded=true';
                    this.url = urlPart;
                    //     console.log(result);
                    $(document).ready(function () {
                        $("#ref").attr('href', this.url);
                    //    window.location.assign(this.url);
                    });
                    return urlPart;
                });
                i++;
            }
        });
        //      console.log(result);
        this.url = urlPart;
        $(document).ready(function () {
            //    $("#frame").attr('src', result);
        });

        return urlPart;

    }

}
