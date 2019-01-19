import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CdserviceService} from '../../shared/cdservice.service';
import {NgForm} from '@angular/forms';
import {Cd} from '../../shared/cd.model';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.css']
})
export class CdComponent implements OnInit {

  private cd: Cd;

  constructor(private toastr: ToastrService, public service: CdserviceService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.cd = new Cd();
    this.service.formData = {
      id: null,
      name: '',
      gender: '',
      releaseDate: ''
    };
  }

// We Can use Also ReactiveForms

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.cd.name = form.value.name;
    this.cd.gender = form.value.gender;
    this.cd.releaseDate = this.datePipe.transform(form.value.releaseDate, 'yyyy-MM-dd');
    // i needed to put the form into a cd object in order to parse the date format and it can't happen through html pipes because it's
    // two way data binding;
    this.service.postCd(this.cd).subscribe(res => {
      this.toastr.success('Inserted successfully', 'CD. Register');
      form.resetForm();
      this.service.getAll();
    });
  }

  updateRecord(form: NgForm) {
    this.cd.id = form.value.id;
    this.cd.name = form.value.name;
    this.cd.gender = form.value.gender;
    this.cd.releaseDate = this.datePipe.transform(form.value.releaseDate, 'yyyy-MM-dd');
    // i needed to put the form into a cd object in order to parse the date format and it can't happen through html pipes because it's
    // two way data binding;
    this.service.putCd(this.cd).subscribe(res => {
      this.toastr.info('Updated successfully', 'CD. Register');
      form.resetForm();
      this.service.getAll();
    });

  }


}
