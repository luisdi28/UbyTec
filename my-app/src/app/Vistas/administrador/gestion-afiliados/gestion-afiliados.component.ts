import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-afiliados',
  standalone: true,
    imports: [
      FormsModule, HttpClientModule, CommonModule
    ],
  templateUrl: './gestion-afiliados.component.html',
  styleUrl: './gestion-afiliados.component.css'
})
export class GestionAfiliadosComponent {
  email: string = '';
  cedula: string = '';
  nombre: string = '';
  tipo: string = '';
  provincia: string = '';
  canton: string = '';
  distrito: string = '';
  telefonos: string[] = [''];  // Array de teléfonos

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

  // Función para formatear el número de teléfono en formato XXXX-XXXX
  formatearTelefono(index: number) {
    let telefonoLimpio = this.telefonos[index].replace(/\D/g, '');

    if (telefonoLimpio.length > 8) {
      telefonoLimpio = telefonoLimpio.slice(0, 8);
    }

    if (telefonoLimpio.length > 4) {
      this.telefonos[index] = `${telefonoLimpio.slice(0, 4)}-${telefonoLimpio.slice(4)}`;
    } else {
      this.telefonos[index] = telefonoLimpio;
    }
  }

  // Función para agregar un nuevo campo de teléfono
  agregarTelefono() {
    if (this.telefonos.length < 3) {
      this.telefonos.push('');
    } else {
      alert("Se permite un máximo de 3 números telefónicos.");
    }
  }

// Función para remover el último campo de teléfono
  removerTelefono() {
    if (this.telefonos.length > 1) {
      this.telefonos.pop();
    } else {
      alert("Debe agregar al menos un número telefónico.");
    }
  }

  validarTelefonosUnicos(): boolean {
    const numerosUnicos = new Set(this.telefonos.map(telefono => telefono.replace(/\D/g, '')));
    if (numerosUnicos.size !== this.telefonos.length) {
      alert("Los números de teléfono deben ser únicos.");
      return false;
    }
    return true;
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

    // Verificar si hay campos faltantes
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    // Validación de formato para cédula y SINPE
    const cedulaLimpia = this.cedula.replace(/\D/g, '');
    if (cedulaLimpia.length !== 9) {
      alert("La cédula debe tener exactamente 9 dígitos.");
      return;
    }

    // Validación de los teléfonos
    for (const telefono of this.telefonos) {
      const telefonoLimpio = telefono.replace(/\D/g, '');
      if (telefonoLimpio.length !== 8) {
        alert("Cada número de teléfono debe tener exactamente 8 dígitos.");
        return;
      }
    }

    const sinpeLimpio = this.sinpe.replace(/\D/g, '');
    if (sinpeLimpio.length !== 8) {
      alert("El número de SINPE debe tener exactamente 8 dígitos.");
      return;
    }

    // Validar que los números de teléfono sean únicos
    if (!this.validarTelefonosUnicos()) {
      return; // Si hay números duplicados, no continuar
    }

    // Si pasa todas las validaciones
    alert('Registro exitoso');
    this.router.navigate(['']);
  }
}


