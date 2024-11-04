import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-admin',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './gestion-admin.component.html',
  styleUrl: './gestion-admin.component.css'
})
export class GestionAdminComponent {
  usuario: string = '';
  password: string = '';
  cedula: string = '';
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  provincia: string = '';
  canton: string = '';
  distrito: string = '';
  telefonos: string[] = [''];  // Array de teléfonos

  passwordVisible: boolean = false;
  mostrarModal: boolean = false;

  constructor(private router: Router) {}

  alternarVisibilidadpassword() {
    this.passwordVisible = !this.passwordVisible;
    const Entradapassword = document.getElementById('password') as HTMLInputElement;
    Entradapassword.type = this.passwordVisible ? 'text' : 'password';
  }

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

  mostrarCondiciones() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  backToAdmin() {
    this.router.navigate(['/sidenavA']);
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
    if (!this.usuario) camposFaltantes.push('Usuario');
    if (!this.password) camposFaltantes.push('Contraseña');

    // Verificar si hay campos faltantes
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    // Validación de formato para cédula
    const cedulaLimpia = this.cedula.replace(/\D/g, '');
    if (cedulaLimpia.length !== 9) {
      alert("La cédula debe tener exactamente 9 dígitos.");
      return;
    }

    // Validación que la contraseña cumpla con las condiciones de seguridad
    const regexPassword = /^(?=.*[A-Z])(?=(.*[a-z]){4,})(?=(.*\d){3,})[A-Za-z\d]{8,16}$/;
    if (!regexPassword.test(this.password)) {
      alert('La contraseña no cumple con las condiciones requeridas: mínimo una letra mayúscula, cuatro letras minúsculas, tres dígitos numéricos y entre 8 y 16 caracteres.');
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
