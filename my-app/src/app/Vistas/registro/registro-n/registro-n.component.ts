import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro-n',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './registro-n.component.html',
  styleUrl: './registro-n.component.css'
})
export class RegistroNComponent {
  email: string = '';
  password: string = '';
  cedula: string = '';
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  provincia: string = '';
  canton: string = '';
  distrito: string = '';
  edad: number | null = null;
  fechaNacimiento: string = '';
  telefonos: string[] = ['']; // Array para almacenar los números de teléfono

  passwordVisible: boolean = false;

  constructor(
    private router: Router,
  ) {}

  alternarVisibilidadpassword() {
    this.passwordVisible = !this.passwordVisible;
    const Entradapassword = document.getElementById('password') as HTMLInputElement;
    Entradapassword.type = this.passwordVisible ? 'text' : 'password';
  }

  calcularEdad() {
    const today = new Date();
    const birthDate = new Date(this.fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.edad = age;
  }

  backTobienvenida() {
    this.router.navigate(['']);
  }

  agregarTelefono() {
    if (this.telefonos.length < 3) {
      this.telefonos.push(''); // Añade un nuevo campo de teléfono vacío
    } else {
      alert("Solo se pueden agregar hasta 3 números de teléfono.");
    }
  }

  eliminarTelefono(index: number) {
    if (this.telefonos.length > 1) {
      this.telefonos.splice(index, 1); // Elimina el teléfono en el índice dado
    }
  }

  Enviar() {
    console.log("Formulario enviado");

    const camposFaltantes = [];

    // Validar campos requeridos
    if (!this.cedula) camposFaltantes.push('Número de Cédula');
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.apellido1) camposFaltantes.push('Primer Apellido');
    if (!this.apellido2) camposFaltantes.push('Segundo Apellido');
    if (!this.provincia) camposFaltantes.push('Provincia');
    if (!this.canton) camposFaltantes.push('Cantón');
    if (!this.distrito) camposFaltantes.push('Distrito');
    if (!this.fechaNacimiento) camposFaltantes.push('Fecha de Nacimiento');

    // Verifica que todos los campos de teléfono estén completos
    for (let telefono of this.telefonos) {
      if (!telefono) {
        camposFaltantes.push('Teléfono'); // Solo se agrega una vez si hay algún campo vacío
        break; // Salimos del bucle si encontramos un campo vacío
      }
    }

    if (!this.email) camposFaltantes.push('Correo');
    if (!this.password) camposFaltantes.push('Contraseña');

    // Si hay campos faltantes, muestra una alerta
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    } else {
      alert('Registro exitoso');
      this.router.navigate(['']);
    }
  }
}
