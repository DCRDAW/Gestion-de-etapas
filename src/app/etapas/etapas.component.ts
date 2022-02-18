import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {

  formulario:any
  constructor() { 
    this.formulario=null
  }
  ngOnInit(): void {
    this.formulario = new FormGroup({
      idEtapa: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]),
      duracion: new FormControl(''),
      longitud: new FormControl(''),
      img: new FormControl(''),
    });
  }
  get idEtapa() { return this.formulario.get('idEtapa'); }
  get duracion() { return this.formulario.get('duracion'); }
  get longitud() { return this.formulario.get('longitud'); }
  get img() { return this.formulario.get('img'); }
  
  anyadir(){
  
  }
}
