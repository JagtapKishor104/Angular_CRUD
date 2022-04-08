import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {

  constructor(private service:ApiService,private router:Router) { }
Data:any;
  ngOnInit(): void {
    this.getapi();
  }
    getapi()
    {
      this.service.getuserdetail().subscribe((posres)=>
      {
        this.Data=posres.result;
        console.log(this.Data);
                
      })
    }

    Dash()
    {
      this.router.navigate(["Dashboard"]).then(()=>
      {
        location.reload();
      })
    }
}
