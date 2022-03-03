import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Etapa } from '../etapa';
import { EnviarService } from '../enviar.service';
import { ImageCropperModule } from 'ngx-image-cropper';
@Component({
  selector: 'app-alta-etapa',
  templateUrl: './alta-etapa.component.html',
  styleUrls: ['./alta-etapa.component.css']
})
export class AltaEtapaComponent implements OnInit {
  formulario:any;
  etapa:Etapa;
  respuesta :any;
  r:any;
  ficheroBase64: string;


  constructor(private enviar:EnviarService) {
    this.formulario=null
    this.etapa=new Etapa('','','')
    this.respuesta = []
    this.r = []
    this.ficheroBase64=''
  }
  ngOnInit(): void {
    this.enviar.recibir().subscribe(res =>{
      this.r = res
      console.log(this.r)
      this.respuesta = JSON.parse(this.r)
    } )
    this.formulario = new FormGroup({
      idEtapa: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]),
      duracion: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]?[0-9]?[0-9]:[0-5][0-9]$/gm)]),
      longitud: new FormControl('',[Validators.required,Validators.pattern(/^\d{1,4}(\,\d{1,3})?[ ]?$/gm)]),
      img: new FormControl(''),
      select: new FormControl('')
    });
  }


  get idEtapa() { return this.formulario.get('idEtapa'); }
  get duracion() { return this.formulario.get('duracion'); }
  get longitud() { return this.formulario.get('longitud'); }
  get img() { return this.formulario.get('img'); }
  get select() { return this.formulario.get('select'); }



  anyadir(){
    this.enviarImagen()
    console.log("componente1.enviar()")
    let datos:any = []
    datos[0]=this.formulario.get('idEtapa').value
    datos[1]=this.formulario.get('duracion').value
    datos[2]=this.formulario.get('longitud').value
    //En lugar de la función flecha, llamar a un método del componente.
    console.log(datos)

    this.enviar.enviar(datos).subscribe(res => console.log(res))

  }

  procesarImagen(imageInput: any) {
    const file: File = imageInput.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', (event: any) => {
      file.text().then(texto => this.ficheroBase64 = texto)
    })
    reader.readAsDataURL(file);
  }

  enviarImagen() {
    console.log("AltaEtapaComponent.enviarImagen()")
    //console.log(this.ficheroBase64)
    //En lugar de la función flecha, llamar a un método del componente.
    this.enviar.enviarImagen(this.ficheroBase64).subscribe(
      res => console.log(res),
      err => console.error(err))
  }

}
