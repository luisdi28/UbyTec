import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-n',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './registro-n.component.html',
  styleUrls: ['./registro-n.component.css']
})
export class RegistroNComponent {
  email: string = '';
  cedula: string = '';
  nombre: string = '';
  tipo: string = '';
  provincia: string = '';
  canton: string = '';
  distrito: string = '';

  telefono1: string = '';
  telefono2: string = '';
  telefono3: string = '';

  mostrarTelefono2: boolean = false;
  mostrarTelefono3: boolean = false;

  sinpe: string = '';
  admin: string = '';

  estado: boolean = false;

  constructor(private router: Router) {}

  formatearCedula() {
    let cedulaLimpia = this.cedula.replace(/\D/g, '');
    if (cedulaLimpia.length > 9) {
      cedulaLimpia = cedulaLimpia.slice(0, 9);
    }
    if (cedulaLimpia.length > 5) {
      this.cedula = `${cedulaLimpia.slice(0, 1)}-${cedulaLimpia.slice(1, 5)}-${cedulaLimpia.slice(5)}`;
    } else if (cedulaLimpia.length > 1) {
      this.cedula = `${cedulaLimpia.slice(0, 1)}-${cedulaLimpia.slice(1)}`;
    } else {
      this.cedula = cedulaLimpia;
    }
  }

  formatearTelefono(telefono: string): string {
    let telefonoLimpio = telefono.replace(/\D/g, '');
    if (telefonoLimpio.length > 8) telefonoLimpio = telefonoLimpio.slice(0, 8);
    return telefonoLimpio.length > 4 ? `${telefonoLimpio.slice(0, 4)}-${telefonoLimpio.slice(4)}` : telefonoLimpio;
  }

  agregarTelefono() {
    if (!this.mostrarTelefono2) {
      this.mostrarTelefono2 = true;
    } else if (!this.mostrarTelefono3) {
      this.mostrarTelefono3 = true;
    } else {
      alert("Solo se pueden agregar hasta 3 números de teléfono.");
    }
  }

  eliminarTelefono() {
    if (this.mostrarTelefono3) {
      this.mostrarTelefono3 = false;
      this.telefono3 = ''; // Limpiar el campo si se oculta
    } else if (this.mostrarTelefono2) {
      this.mostrarTelefono2 = false;
      this.telefono2 = ''; // Limpiar el campo si se oculta
    }
  }

  backTobienvenida() {
    this.router.navigate(['']);
  }

  Enviar() {
    console.log("Formulario enviado");
    const camposFaltantes = [];

    // Validar campos requeridos
    if (!this.cedula) camposFaltantes.push('Número de Cédula');
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.tipo) camposFaltantes.push('Tipo de comercio');
    if (!this.provincia) camposFaltantes.push('Provincia');
    if (!this.canton) camposFaltantes.push('Cantón');
    if (!this.distrito) camposFaltantes.push('Distrito');
    if (!this.email) camposFaltantes.push('Correo');
    if (!this.sinpe) camposFaltantes.push('Número de SINPE móvil');
    if (!this.admin) camposFaltantes.push('Administrador del comercio');

    // Validar que al menos un teléfono esté presente
    if (!this.telefono1 && !this.telefono2 && !this.telefono3) {
      camposFaltantes.push('Al menos un número de teléfono');
    }

    // Validar que los campos de teléfono visibles estén completos y formateados correctamente
    if (this.mostrarTelefono2 && (!this.telefono2 || this.telefono2.replace(/\D/g, '').length !== 8)) {
      camposFaltantes.push('Teléfono 2');
    }
    if (this.mostrarTelefono3 && (!this.telefono3 || this.telefono3.replace(/\D/g, '').length !== 8)) {
      camposFaltantes.push('Teléfono 3');
    }
    if (!this.telefono1 || this.telefono1.replace(/\D/g, '').length !== 8) {
      camposFaltantes.push('Teléfono 1');
    }

    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    const cedulaLimpia = this.cedula.replace(/\D/g, '');
    if (cedulaLimpia.length !== 9) {
      alert("La cédula debe tener exactamente 9 dígitos.");
      return;
    }

    const sinpeLimpio = this.sinpe.replace(/\D/g, '');
    if (sinpeLimpio.length !== 8) {
      alert("El número de SINPE debe tener exactamente 8 dígitos.");
      return;
    }

    alert('Registro exitoso');
    this.router.navigate(['']);
  }
}
