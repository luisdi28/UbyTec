import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio-a',
  standalone: true,
  imports: [ FormsModule, HttpClientModule ],
  templateUrl: './inicio-a.component.html',
  styleUrl: './inicio-a.component.css',
})
export class InicioAComponent {
  tipoUsuario: string = '';
  email: string = '';
  password: string = '';

  passwordVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  alternarVisibilidadpassword() {
    this.passwordVisible = !this.passwordVisible;
    const Entradapassword = document.getElementById('password') as HTMLInputElement;
    Entradapassword.type = this.passwordVisible ? 'text' : 'password';
  }

  backTobienvenida() {
    this.router.navigate(['']);
  }

  Enviar() {
    const camposFaltantes = [];

    if (!this.email) camposFaltantes.push('Correo');
    if (!this.password) camposFaltantes.push('Contraseña');

    if (camposFaltantes.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`);
    } else {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/sidenavA']);
    }
  }
}
