import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public datos;
  public aux_trans;
  public salud;
  public pension;
  public desc;
  public novedad;
  public salario;


 
  constructor(public navCtrl: NavController, public http: Http) {
 
    this.http.get('https://s3.amazonaws.com/testsymfonybucket/person/contract/00001.json').map(res => res.json()).subscribe(data => {
        //El servicio no retorna un arreglo de objetos, esta enviando un objeto generando un problema entre la vista ya que esta solo puede leer
        //array de objetos esto por si el ejercicio fuera para n empleados 
        this.datos = [data];
        console.log(data.novelty[0].days); 
        this.salario = data.salary;  
        this.calculos(data.salary);
        //La pregunta no es clara ya que las dos tienen la misma condición.
        if( data.novelty[0].type.remunerada != 0){
          this.desc = data.salary - ( ( data.salary / data.days ) * data.novelty[0].days );  
        }else if( data.novelty[0].type.remunerada == 0 ){
          console.log("eeeeeee");
          if (data.aux_transport == 1 ){
            console.log("iiiii", data.novelty.days);
            this.aux_trans = 2771 * ( data.days - data.novelty[0].days);
          }else{
            this.aux_trans = 0;
            console.log("ddddddd");
          }
        }
        this.novedad = data.novelty[0].type.name + " " + data.novelty[0].type.code; 

        

    });    
  }

  calculos(salary){
    this.salud = salary * 0.04;
    this.pension = salary * 0.04;
    console.log("funciona", this.salud);
  }

  todo = {}
  logForm(sueldo) {
    console.log(sueldo);
    this.salario = sueldo;
    this.calculos(sueldo);

  }
  
}