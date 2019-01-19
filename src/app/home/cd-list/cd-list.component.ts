import {Component, OnInit} from '@angular/core';
import {CdserviceService} from '../../shared/cdservice.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.css']
})
export class CdListComponent implements OnInit {

  myForm: FormGroup;

  constructor(public service: CdserviceService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private datePipte: DatePipe) {
    this.createForm();

  }

  ngOnInit() {
    this.service.getAll();
  }


  createForm() {
    this.myForm = this.formBuilder.group(
      {
        search: [''],
        filter: [''],
        startDate: ['', moment()],
        endDate: ['', moment()]
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCd(id).subscribe(res => {
        this.service.getAll();
        this.toastr.warning('Deleted successfully', 'CD. Register');
      });
    }
  }

  onSearch(myForm: FormGroup) {
    const filter = myForm.value.filter;
    const search = myForm.value.search;
    const startDate = this.datePipte.transform(myForm.value.startDate, 'yyyy-MM-dd');
    const endDate = this.datePipte.transform(myForm.value.endDate, 'yyyy-MM-dd');
    if (startDate !== null && endDate !== null) {
      if (this.dateValidation(myForm)) {
        if (filter === '' && search === '') {
          this.service.findByReleaseDate(startDate, endDate);
        }
        if (filter === 'name' && search !== '') {
          this.service.findByReleaseDateAndName(search, startDate, endDate);
        }
        if (filter === 'gender' && search !== '') {
          this.service.findByReleaseDateAndGender(search, startDate, endDate);
        }
      }
    } else {
      if (filter === 'name' && search !== '') {
        this.service.findByName(search);
      }
      if (filter === 'gender' && search !== '') {
        this.service.findByGender(search);
      }
    }
  }

  dateValidation(myForm: FormGroup): boolean {
    const startDate = myForm.value.startDate;
    const endDate = myForm.value.endDate;
    if (Date.parse(startDate) > Date.parse(endDate)) {
      this.toastr.warning(
        'End Date Must be Greater than Start Date');
      return false;
    }
    return true;
  }

  reset() {
    this.myForm.reset();
  }

  onLoad() {
    this.service.getAll();
  }
}






