import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.component.html',
  styleUrl: './qrgenerator.component.sass'
})
export class QrgeneratorComponent implements OnInit {

  urlForm: FormGroup;
  url: Observable<string>;

  constructor(private fb:FormBuilder){
    this.urlForm = this.fb.group({
      url: ['', Validators.required]
    });

    this.url = of('');
  }

  ngOnInit(): void {
    
  }

  updateURL(form:FormGroup){
    this.url = of(form.value.url);
  }



}
