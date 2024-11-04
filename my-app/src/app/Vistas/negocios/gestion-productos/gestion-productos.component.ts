import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gestion-productos',
  standalone: true,
    imports: [
      FormsModule, HttpClientModule
    ],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent {
  nombre: string = '';
  categoria: string = '';
  foto: File | null = null;
  precio: number | null = null;

  constructor(
    private router: Router,
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.foto = file;
    }
  }

  backToAdmin() {
    this.router.navigate(['/sidenavN']);
  }

  Enviar() {
    console.log("Formulario enviado");

    const camposFaltantes = [];

    // Validar campos faltantes
    if (!this.nombre) camposFaltantes.push('Nombre');
    if (!this.categoria) camposFaltantes.push('Categoría');
    if (!this.foto) camposFaltantes.push('Foto');
    if (!this.precio) camposFaltantes.push('Precio');

    // Si hay campos faltantes, muestra una alerta
    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
      return;
    }

    // Si todas las validaciones se cumplen, muestra un mensaje de éxito
    alert('Registro exitoso');
    this.router.navigate(['/sidenavN']);
  }
}
