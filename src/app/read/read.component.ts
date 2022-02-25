import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiService) { }

  readEntry:any;
successmessage:any;

  ngOnInit(): void {
    this.getAllData();
  }

  deleteEntry(id:any){
    console.log(id,"deleteEntry");
    this.service.deleteEntry(id).subscribe((res)=>{
        console.log(res,'deleteresult');
        this.successmessage = res.message;

        this.getAllData();
    });
  }

  getAllData(){
    this.service.getAllEntries().subscribe((res)=>{
      console.log(res, "res==>");
      this.readEntry = res.data;
    })
  }

}
