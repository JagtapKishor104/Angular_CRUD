import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  showadd: boolean = false;
  showupdate: boolean = false;
  Data: any;
  constructor(private fb: FormBuilder, private service: ApiService) { }
  sol() {
    this.myform.reset();
    this.showadd = true;
    this.showupdate = false;
  }
  ngOnInit(): void {

      this.getuser();
  }
 myform = this.fb.group({
   _id:[""],
    fname: ["",Validators.required],
    lname: ["",Validators.required],
    email: ["",Validators.required],
    mobile: ["",Validators.required],
    salary: ["",Validators.required]
  });

  addemployee()
  {   
    if(this.myform.valid)
    {
      console.log(this.myform.valid);
      this.service.postusetdetail(this.myform.value).subscribe((posres)=>
      {
        console.log(posres);
        alert("Data send Successfully");
        let ref=document.getElementById('exampleModal');
        ref?.click(); 
        this.getuser();
      },(err:HttpErrorResponse)=>
      {
        console.log(err);
      })
    }
    else{
      alert("Something Went Wrong");
    }
  }
  updateemployee()
  {
    var _id=this.service.get_id();
    console.log(_id);
    
    if(this.myform.valid)
    {
      this.service.updateuserdetail(_id,this.myform.value).subscribe((posres)=>
      {
        console.log(posres);
        alert("Data Updated");
        sessionStorage.clear();
        let ref=document.getElementById('exampleModal');
        ref?.click(); 
        this.getuser();
      })
    }
  }
  Edit(data:any) {
    console.log(data);
    sessionStorage.setItem("_id",data._id);
    this.showadd = false;
    this.showupdate = true;
    this.myform.patchValue(
      {
        fname:data.ufname,
        lname:data.ulname,
        email:data.uemail,
        mobile:data.umobile,
        salary:data.usalary
      }
    )
  }
  getuser() {
    this.service.getuserdetail().subscribe((posres) => {
      this.Data = posres.result;
      console.log(this.Data);

    })
  }
  delete(data: any) {
    this.service.deleteuserdetail(data._id).subscribe((posres) => {
      console.log(data._id);
      alert("Deleted Successfully");
     
      this.getuser();
    },
      (err: HttpErrorResponse) => {
        console.log(err);

      })

  }

}
