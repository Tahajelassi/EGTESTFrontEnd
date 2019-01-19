import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cd} from '../../../shared/cd.model';
import {CdserviceService} from '../../../shared/cdservice.service';

@Component({
  selector: 'app-cd-element',
  templateUrl: './cd-element.component.html',
  styleUrls: ['./cd-element.component.css']
})
export class CdElementComponent implements OnInit {

  @Input() c: Cd;
  @Output() deleteClicked = new EventEmitter<number>();

  constructor(private service: CdserviceService) {
  }

  ngOnInit() {
  }

  populateForm(cd: Cd) {
    this.service.formData = Object.assign({}, cd);
  }

  delete() {
    this.deleteClicked.emit(this.c.id);
  }
}
