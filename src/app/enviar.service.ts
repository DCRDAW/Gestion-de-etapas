import { Injectable } from '@angular/core';
//Módulos necesarios para la comunicación AJAX
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ImageCropperModule } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'

})

export class EnviarService {


  constructor(private http: HttpClient) { }

  public enviar(texto:any){
    console.log(`EnviarService.enviar(${texto})`)
    const url = 'http://localhost/DWEC/2122_2DAW/php/controlador/etapas_Controlador.php'
    const datos ={
      'nombre':'altaEtapa',
      'idEtapa': texto[0],
      'duracion':texto[1],
      'longitud':texto[2]
    }

    const bodyJSON = JSON.stringify(datos)
   /* const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }*/
    console.log(bodyJSON)
    return this.http.post<any>(url, bodyJSON );
  }

  public recibir(){
    const url = 'http://localhost/DWEC/2122_2DAW/php/controlador/etapas_Controlador.php'
    const respuesta={
      'nombre':'select',

    }
    const  bodyJSON = JSON.stringify(respuesta)
    //console.log(bodyJSON)
    return this.http.post<any>(url,bodyJSON)
  }


  public enviarImagen(imagenBase64: string): Observable<Response> {
    /*const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/api/v1/image-upload', formData);
    */
    console.log(`enviar.uploadImage()`)
    const url = 'http://localhost/DWEC/2122_2DAW/php/controlador/etapas_Controlador.php'
    const datos ={
      'nombre':'imagen',
      'imagen': imagenBase64
    }
    const bodyJSON = JSON.stringify(datos)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Acces-Control-Allow-Headers':'*'
      })
    }
    console.log(bodyJSON)
    return this.http.post<any>(url, bodyJSON , httpOptions);
  }
}
