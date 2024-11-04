import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-repartidores',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './gestion-repartidores.component.html',
  styleUrl: './gestion-repartidores.component.css'
})
export class GestionRepartidoresComponent {
  email: string = '';
  usuario: string = '';
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  provincia: string = '';
  canton: string = '';
  distrito: string = '';
  telefonos: string[] = [''];  // Array de teléfonos

  constructor(private router: Router) {}

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

  backToAdmin() {
    this.router.navigate(['/sidenavA']);
  }

  Enviar() {
    console.log("Formulario enviado");
    const camposFaltantes = [];

    // Validar campos requeridos
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.apellido1) camposFaltantes.push('Primer Apellido');
    if (!this.apellido2) camposFaltantes.push('Segundo Apellido');
    if (!this.provincia) camposFaltantes.push('Provincia');
    if (!this.canton) camposFaltantes.push('Cantón');
    if (!this.distrito) camposFaltantes.push('Distrito');
    if (!this.email) camposFaltantes.push('Correo');
    if (!this.usuario) camposFaltantes.push('Usuario');

    // Verificar si hay campos faltantes
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
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

    // Validar que los números de teléfono sean únicos
    if (!this.validarTelefonosUnicos()) {
      return; // Si hay números duplicados, no continuar
    }

    // Si pasa todas las validaciones
    alert('Registro exitoso');
    this.router.navigate(['/sidenavA']);
  }
}
