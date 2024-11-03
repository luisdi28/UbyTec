import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio-c',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './inicio-c.component.html',
  styleUrls: ['./inicio-c.component.css'],
})
export class InicioCComponent {
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
    }else {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/sidenavC']);
    }
  }
}
