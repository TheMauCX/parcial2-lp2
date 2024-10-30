import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CarreraService } from '../services/carrera.service';
import { Carrera } from '../Models/carrera';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [SidebarComponent, CardModule, CommonModule, FormsModule, TableModule, RouterModule, DialogModule, ButtonModule, InputTextModule, ToastModule, ConfirmDialogModule],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent implements OnInit {
  carreras:Carrera[]=[];
  titulo:string='';
  opc:string='';
  carrera = new Carrera();
  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;

  constructor(private carreraService: CarreraService, private messageService: MessageService) {}

  ngOnInit():void{
    this.listarCarreras();
  }
  listarCarreras(){
    this.carreraService.getCarrera().subscribe((data)=>{
      this.carreras=data;
    });
  }
  hola(id:number){
    console.log('button clicked '+id);
  }
  showDialogCreate() {
    this.titulo="Crear carrera"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number) {
    this.titulo="Editar carrera"
    this.opc="Editar"; 
   this.carreraService.getCarreraById(id).subscribe((data)=>{
      this.carrera=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteCategoria(id: number) {
    this.isDeleteInProgress = true;
    this.carreraService.deleteCarrera(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'carrera eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarCarreras();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la carrera',
        });
      },
    });
  }
  addCategoria():void{ 
    this.carreraService.createCarrera(this.carrera).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'carrera Registrada',
        });
        this.listarCarreras();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar la carrera',
        });
      },
    });    
    this.visible = false;
  }
  editCategoria(){
    this.carreraService.updateCarrera(this.carrera,this.carrera.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'carrera Editada',
        });
        this.listarCarreras();
        console.log(this.carrera.id+' '+this.carrera.nombre+' '+this.carrera.facultad_id);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la carrera',
        });
      },
    });    
    this.visible = false;
  }
  opcion():void{
    if(this.op==0){
      this.addCategoria();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editCategoria();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
    
  }
 limpiar(){
  this.titulo='';
  this.opc='';
  this.op = 0; 
  this.carrera.id=0;
  this.carrera.nombre='';
  this.carrera.facultad_id=0;
 }
}
