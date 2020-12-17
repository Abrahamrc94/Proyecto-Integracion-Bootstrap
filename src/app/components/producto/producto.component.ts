import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/productoInterface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  registerForm: FormGroup;
  productos: any[];
  producto: any;

  //Constructor que incializa 
  constructor( private build: FormBuilder, private productoService: DatabaseService) { 

    this.productos = [];
    //this.producto = Object;

    this.registerForm = this.build.group({
      id:['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.productoService.GetAllProducts().subscribe(res =>{
      this.productos = res;
    })
  }

  GetProductById(): void{
    this.productoService.GetProductById(this.registerForm.value.id)
      .subscribe(
        res=>{
          this.producto=res;
        },
        err => {
          console.log(err);
        }
      )
    
  }

  createProducto(): void{
    let productoCreated: Producto;
    productoCreated = this.registerForm.value;
    this.productoService.createProduct(this.registerForm.value).subscribe(response => {
      console.log(response);
    })
  }
}
