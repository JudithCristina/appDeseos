import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { VirtualTimeScheduler, from } from 'rxjs';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList, { static: true}) lista: IonList;
  @Input() terminada=true;
  constructor(public deseosService:DeseosService, private router: Router,private alertController: AlertController) {
  
  }
  

  ngOnInit() {}
  listaSeleccionada(lista){
    if(this.terminada){
    this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)}
    else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)}
    }
   borrarLista(lista){
    this.deseosService.borrarLista(lista);
   }
   editar = true;
   async editarLista(lista: Lista)
   {
     const alert = await this.alertController.create({
       header: 'Editar lista',
       inputs:[{
        name:"titulo",
        value:lista.titulo,
        type:"text",
        placeholder:"Editar texto"
 
 
       }
     ],
       buttons: [
         {
       text:"Cancelar",
       role:"cancel",
       handler:()=>{
      console.log("Cancelado")
      this.lista.closeSlidingItems();
       }
       },
     {
        text:"Editar",
        handler:(data)=>{
          console.log(data);
          if(data.titulo.length === 0 ){
            return;
           }
           lista.titulo =data.titulo;
           this.deseosService.guardarStorage();
           this.lista.closeSlidingItems();

          /*const listaId= this.deseosService.crearListar(data.titulo);
          this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)*/
        }
     }]
     });
     alert.present();
     this.editar=false
     this.deseosService.guardarStorage();
   }
  }

