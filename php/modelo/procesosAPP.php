
<?php



class procesosAPP{
    public function __construct()
    {
      require_once "procesosBD.php";
      $this->conexion = new procesosBD();
    }
    //Para insertar las etapas recogemos los datos del formulario y se lo pasamos al metodo
  function altaEtapas($idEtapa, $duracion, $kilometros){
      $insercion = "INSERT INTO `etapas`(`idEtapa`, `duracion`, `kilometros`, `imgEtapa`, `idPoblacionInicio`, `idPoblacionFin`) VALUES ($idEtapa,$duracion, $kilometros, 'a' , 1, 2)";
      if($this->conexion->consultas($insercion)){
        return true;
      }else{
        return false;
      }
    }
    //En este metodo validamos los campos y vemos si existen, las validadicone están hechas con expresiones regulares
  function validar($idEtapa, $duracion, $kilometros){
    $error=[];

    //Verificación Id
    if(!isset($idEtapa)){
      $error[]="idEtapa no puede estar vacio";
    }else{
      if(strlen($idEtapa)<1 || strlen($idEtapa)>2){
        $error[]="El formato de idEtapa es inválido";
      }
    }
    //Verificacion duracion
    if(!isset($duracion)){
      $error[]="el campo duracion no puede estar vacio";
    }else{
      if(preg_match('/^[0-9]?[0-9]?[0-9]:[0-5][0-9]$/',$duracion)==0){
        $error[]="El formato del campo duracion es inválido";
      }
    }
    //Verficion de los Kilometros
    if(!isset($kilometros)){
      $error[]="el campo longitud no puede estar vacio";
    }else{
      if(preg_match('/^\d{1,4}(\,\d{1,3})?[ ]?$/',$kilometros)==0){
        $error[]="El formato del campo longitud es inválido";
      }
    }
    return $error;
  }


  //cogemos las poblaciones de la base de datos y se las mandamos al fronted con un JSON
  function poblaciones(){
    $consulta = "SELECT idPoblacion, nombrePoblacion FROM poblaciones WHERE 1";
    $resultado=  $this->conexion->consultas($consulta);
    $poblacion = array();
    while ($fila = $this->conexion->extraerFila($resultado)){
      array_push($poblacion,
        [
          "idPoblacion" => $fila["idPoblacion"],
          "nombrePoblacion"=> $fila["nombrePoblacion"]
        ]
      );
    }
    return json_encode($poblacion);

  }


  function decofificacionImagnes($imagen64){
//eliminamos data:image/png; y base64, de la cadena que tenemos

    list(, $imagen64) = explode(';', $imagen64);
    list(, $imagen64) = explode(',', $imagen64);
//Decodificamos $Base64Img codificada en base64.
    $imagen64 = base64_decode($imagen64);
//escribimos la información obtenida en un archivo llamado
//unodepiera.png para que se cree la imagen correctamente
    file_put_contents('imagenes/unodepiera.png', $imagen64);
    return json_encode("<img src='unodepiera.png' alt='unodepiera' />");
  }
}
