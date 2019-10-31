import { Component} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private modalService: NgbModal) {}



  /*****************************************
   Function Name : open()
   Parameter : content
   Purpose : To Open Popup / Modal 
   Created By : Arnab Ganguly
   Created date : 31/10/2019
   Edited By :
   Edited Date:
   Output Type: 
  *******************************************/
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg', backdrop: 'static', windowClass:'animated slideInRight'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }



  
}
