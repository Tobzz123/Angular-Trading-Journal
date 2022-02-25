import { Component } from '@angular/core';

@Component({
    selector: 'journals',
    template: '<h2>{{ title }}</h2>' 
})
export class Journal {
   title: string;
   stockTicker: string;
   date: string;
   notes: string;

   constructor(title: string, stockTicker: string, date: string, notes: string){
       this.title = title;
       this.stockTicker = stockTicker;
       this.date = date;
       this.notes = notes;
   }
}