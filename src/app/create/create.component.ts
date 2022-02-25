import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiService) { }

  errormessage:any;
  successmessage:any;

  ngOnInit(): void {
  }

  entryForm = new FormGroup({
    'title':new FormControl('',Validators.required),
    'stock_ticker': new FormControl('',Validators.required),
    'date': new FormControl('',Validators.required),
    'notes': new FormControl('', Validators.required)
    
  });

  entrySubmit(){
    if(this.entryForm.valid){
      console.log(this.entryForm.value);
      this.service.createEntry(this.entryForm.value).subscribe((res)=>{
        console.log(res, 'res==>');
        this.entryForm.reset();
        this.successmessage = res.message;
      })
    }
    else{
     this.errormessage = "Please enter into all fields";
    }
  }

}
