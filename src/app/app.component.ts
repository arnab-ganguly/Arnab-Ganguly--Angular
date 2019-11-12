import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  timersubscription: any;
  calltime: any;
  intervalTime: number;
  callerName: string;
  callerDetailsArray: any[];
  callerAddress: string;
  callerPhoneNo: string;
  userImage: string;
  startTime;
  endTime;
  flagStart:boolean =true;
  inCallStatus:string = "Hang Up";
  dangerOrSuccess ="danger";

  //constructor
  constructor(private modalService: NgbModal) {
    this.intervalTime = 1000;
    this.callerDetailsArray = [];   
  }

  /*****************************************
   Function Name : open()
   Parameter : content
   Purpose : To Open Popup / Modal , Subcription & Unsubscribe for Interval 
   Created By : Arnab Ganguly
   Created date : 31/10/2019
   Edited By : Arnab Ganguly
   Edited Date: 01/11/2019
   Output Type: 
  *******************************************/
  open(content) {

    this.flagStart = true;
    this.dangerOrSuccess ="danger";
    this.calltime = '00:00:00';    
    if (this.callerDetailsArray.length == 0) {
      this.callerDetailsArray = [
        { name: "Shirley Thomas", address: "Marketing Executive,Inform Group Pty Ltd,Philippines,Cosmetics", phone: "+1(234) 123 123", userImage: "usephOutLine.png" },
        { name: "Lisa Clark", address: "Sales Executive,Inform Group Pty Ltd,Boston,USA", phone: "+1(456) 345 980", userImage: "usephOutLine_01.png" },
        { name: "Jessica Williams", address: "Caller Executive,Inform Group Pty Ltd,Kolkata,India", phone: "+91(011) 3331 1113", userImage: "usephOutLine_02.png" },
        { name: "Linda Johnson", address: "Marketing Executive,Inform Group Pty Ltd,Delhi,India", phone: "+91(011) 2342 4567", userImage: "usephOutLine_03.png" }
      ];
    }

    let randomIndex = Math.floor(Math.random() * this.callerDetailsArray.length);
    this.callerName = this.callerDetailsArray[randomIndex].name;
    this.callerAddress = this.callerDetailsArray[randomIndex].address;
    this.callerPhoneNo = this.callerDetailsArray[randomIndex].phone;
    this.userImage = this.callerDetailsArray[randomIndex].userImage;

   
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdrop: 'static',
        windowClass: 'animated slideInRight'
      }
    ).result.then((result) => { }, (reason) => {
      
    });

  }
  /*****************************************
   Function Name : setTime()
   Parameter : 
   Purpose : Time elapsed calculation
   Created By : Arnab Ganguly
   Created date : 01/11/2019
   Edited By :
   Edited Date: 
   Output Type: string / HH:MM:SS
  *******************************************/
  setTime()
  { 
    this.endTime = new Date()
    var timeDiff = this.endTime - this.startTime //in ms
    var ms = timeDiff % 1000;
    timeDiff = (timeDiff - ms) / 1000;
    var secs = timeDiff % 60;
    timeDiff = (timeDiff - secs) / 60;
    var mins = timeDiff % 60;
    var hrs = (timeDiff - mins) / 60;
    this.calltime = this.pad(hrs,2) + ':' + this.pad(mins,2) + ':' + this.pad(secs,2);
  }
/*****************************************
   Function Name : pad()
   Parameter : 
   Purpose : pad for single digit
   Created By : Arnab Ganguly
   Created date : 01/11/2019
   Edited By :
   Edited Date: 
   Output Type: two digit
  *******************************************/
  pad(n, z) {
    return ('00' + n).slice(-z);
  }

/*****************************************
   Function Name : timerStart()
   Parameter : 
   Purpose : Start the timer
   Created By : Arnab Ganguly
   Created date : 12/11/2019
   Edited By :
   Edited Date: 
   Output Type: 
  *******************************************/
  timerStart()
  {
    console.log("this.flagStart",this.flagStart)
    if(this.flagStart)
    {
      this.calltime = '00:00:00';
      this.startTime = new Date();
      this.timersubscription = interval(this.intervalTime).subscribe(n => 
        this.setTime()
      );
      this.inCallStatus = "IN Call";
      this.dangerOrSuccess ="success";
      this.flagStart = false;
    }
    else{

      this.calltime = '00:00:00';
      this.dangerOrSuccess ="danger";
      this.inCallStatus = "Hang Up";
      this.flagStart = true;
      if (this.timersubscription) {
        this.timersubscription.unsubscribe();
      }

    }
    

  }

}
