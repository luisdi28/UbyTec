import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-tipo-comercio',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule
  ],
  templateUrl: './gestion-tipo-comercio.component.html',
  styleUrls: ['./gestion-tipo-comercio.component.css']
})
export class GestionTipoComercioComponent {
  nombre: string = '';
  identificador: string = '';
  tipo: string = '';
  identificadoresUsados: Set<string> = new Set(); // Para almacenar identificadores únicos

  constructor(
    private router: Router,
  ) {}

  backToAdmin() {
    this.router.navigate(['/sidenavA']);
  }

  generarIdentificador() {
    if (!this.tipo) return;

    const primeraLetra = this.tipo.charAt(0).toUpperCase(); // Toma la primera letra del tipo de comercio
    let nuevoIdentificador: string;

    do {
      const numerosAleatorios = Math.floor(100000000000 + Math.random() * 900000000000); // Genera 12 dígitos aleatorios
      nuevoIdentificador = `${primeraLetra}-${numerosAleatorios}`;
    } while (this.identificadoresUsados.has(nuevoIdentificador)); // Asegúrate de que sea único

    this.identificador = nuevoIdentificador; // Asigna el nuevo identificador al campo
    this.identificadoresUsados.add(nuevoIdentificador); // Añade el identificador a la lista de usados
  }

  Enviar() {
    console.log("Formulario enviado");

    const camposFaltantes = [];

    // Validar campos faltantes
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.tipo) camposFaltantes.push('Tipo de Comercio');

    // Si hay campos faltantes, muestra una alerta
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    // Si todas las validaciones se cumplen, muestra un mensaje de éxito
    alert('Registro exitoso');
    this.router.navigate(['/sidenavA']);
  }
}
