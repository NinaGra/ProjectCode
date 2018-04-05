import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchComponent } from './services/search/search.component';



declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnDestroy {
  @Input() input: any = "";

  scroll: boolean = false;
  scrollStart: boolean = false;
  start: any;
  htmlElement: any;

  eventSubject = new Subject<string>();
  eventListener = null;
  constructor(private searchService: SearchComponent) {
    this.eventListener = this.eventSubject.subscribe(s => {
      this.searchService.handle(s);
    });
    console.log('string ' + this.eventListener);



  }

  process(event: any) {
    this.input = event;
    console.log(event);
    console.log("Event triggered ************************************************");
    this.eventSubject.next(event);
    this.searchService.handle(event);
  }



  dropDown() {

  }



  detectScroll() {
    this.htmlElement = document.getElementById('menu');
    this.htmlElement.style.position = 'fixed';
    this.htmlElement.style.zIndex = '2';
    this.scroll = true;
    this.startInterval();


  }


  startInterval() {
    if (this.scroll && !this.scrollStart) {
      this.scrollStart = true;
      var startTime = new Date().getTime();
      var interval = setInterval(() => {
        if (new Date().getTime() - startTime > 2000) {
          clearInterval(interval);
          this.scrollStart = false;
          this.htmlElement.style.position = 'relative';
          this.htmlElement.style.zIndex = '-2';
          return;
        }
        //do whatever here..
      }, 2000);
    }
  }


  hideElements() {
    document.getElementById("contentMenu").style.visibility = "hidden";
    var startTime = new Date().getTime();
    var interval = setInterval(() => {
      if (new Date().getTime() - startTime > 200) {
        clearInterval(interval);
        document.getElementById("contentMenu").style.visibility = "visible";
        return;
      }
      //do whatever here..
    }, 200);

  }

ngOnDestroy(){
this.eventSubject.unsubscribe(); 
}



}
