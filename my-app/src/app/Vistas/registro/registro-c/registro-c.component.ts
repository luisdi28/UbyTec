import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-c',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './registro-c.component.html',
  styleUrls: ['./registro-c.component.css'],
})
export class RegistroCComponent {
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
  telefono: string = '';

  passwordVisible: boolean = false;
  mostrarModal: boolean = false;

  constructor(
    private router: Router,
  ) {
  }

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

  formatearCedula() {
    // Remover cualquier carácter no numérico
    let cedulaLimpia = this.cedula.replace(/\D/g, '');

    // Limitar a 9 dígitos en total
    if (cedulaLimpia.length > 9) {
      cedulaLimpia = cedulaLimpia.slice(0, 9);
    }

    // Formatear la cédula
    if (cedulaLimpia.length > 5) {
      this.cedula = `${cedulaLimpia.slice(0, 1)}-${cedulaLimpia.slice(1, 5)}-${cedulaLimpia.slice(5)}`;
    } else if (cedulaLimpia.length > 1) {
      this.cedula = `${cedulaLimpia.slice(0, 1)}-${cedulaLimpia.slice(1)}`;
    } else {
      this.cedula = cedulaLimpia;
    }
  }

  formatearTelefono() {
    // Remover cualquier carácter no numérico
    let telefonoLimpio = this.telefono.replace(/\D/g, '');

    // Limitar a 8 dígitos en total
    if (telefonoLimpio.length > 8) {
      telefonoLimpio = telefonoLimpio.slice(0, 8);
    }

    // Formatear el número de teléfono
    if (telefonoLimpio.length > 4) {
      this.telefono = `${telefonoLimpio.slice(0, 4)}-${telefonoLimpio.slice(4)}`;
    } else {
      this.telefono = telefonoLimpio;
    }
  }

  mostrarCondiciones() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  backTobienvenida() {
    this.router.navigate(['']);
  }

  Enviar() {
    console.log("Formulario enviado");

    // 1. Verificar que todos los campos requeridos estén completos
    const camposFaltantes = [];
    if (!this.cedula) camposFaltantes.push('Número de Cédula');
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.apellido1) camposFaltantes.push('Primer Apellido');
    if (!this.apellido2) camposFaltantes.push('Segundo Apellido');
    if (!this.provincia) camposFaltantes.push('Provincia');
    if (!this.canton) camposFaltantes.push('Cantón');
    if (!this.distrito) camposFaltantes.push('Distrito');
    if (!this.fechaNacimiento) camposFaltantes.push('Fecha de Nacimiento');
    if (!this.telefono) camposFaltantes.push('Teléfono');
    if (!this.email) camposFaltantes.push('Correo');
    if (!this.password) camposFaltantes.push('Contraseña');

    // Si faltan campos, muestra un mensaje y termina la función
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    // 2. Validar que la cédula tenga exactamente 9 dígitos numéricos
    const cedulaLimpia = this.cedula.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (cedulaLimpia.length !== 9) {
      alert("La cédula debe tener exactamente 9 dígitos.");
      return;
    }

    // 3. Validar que el número de teléfono tenga exactamente 8 dígitos numéricos
    const telefonoLimpio = this.telefono.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (telefonoLimpio.length !== 8) {
      alert("El número de teléfono debe tener exactamente 8 dígitos.");
      return;
    }

    // 4. Validar que la contraseña cumpla con las condiciones de seguridad
    const regexPassword = /^(?=.*[A-Z])(?=(.*[a-z]){4,})(?=(.*\d){3,})[A-Za-z\d]{8,16}$/;
    if (!regexPassword.test(this.password)) {
      alert('La contraseña no cumple con las condiciones requeridas: mínimo una letra mayúscula, cuatro letras minúsculas, tres dígitos numéricos y entre 8 y 16 caracteres.');
      return;
    }

    // Si todas las validaciones se cumplen, muestra un mensaje de éxito
    alert('Registro exitoso');
    this.router.navigate(['']);
  }
}
