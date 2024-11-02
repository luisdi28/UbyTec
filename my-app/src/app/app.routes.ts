import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar esto
import {BienvenidaComponent} from "./Vistas/bienvenida/bienvenida.component";
import {RegistroCComponent} from "./Vistas/registro/registro-c/registro-c.component";
import {RegistroNComponent} from "./Vistas/registro/registro-n/registro-n.component";
import {InicioCComponent} from "./Vistas/inicio/inicio-c/inicio-c.component";
import {InicioAComponent} from "./Vistas/inicio/inicio-a/inicio-a.component";
import {InicioNComponent} from "./Vistas/inicio/inicio-n/inicio-n.component";
import {SidenavCComponent} from "./Vistas/sidenav/sidenav-c/sidenav-c.component";
import {SidenavAComponent} from "./Vistas/sidenav/sidenav-a/sidenav-a.component";
import {SidenavNComponent} from './Vistas/sidenav/sidenav-n/sidenav-n.component';
import {GestionAdminComponent} from './Vistas/administrador/gestion-admin/gestion-admin.component';
import {GestionAfiliadosComponent} from './Vistas/administrador/gestion-afiliados/gestion-afiliados.component';
import {GestionRepartidoresComponent} from './Vistas/administrador/gestion-repartidores/gestion-repartidores.component';
import {GestionTipoComercioComponent} from './Vistas/administrador/gestion-tipo-comercio/gestion-tipo-comercio.component';
import {ReporteCVentasComponent} from './Vistas/administrador/reporte-c-ventas/reporte-c-ventas.component';
import {ReporteVentasAfiliadoComponent} from './Vistas/administrador/reporte-ventas-afiliado/reporte-ventas-afiliado.component';
import {EntrarComercioComponent} from './Vistas/cliente/entrar-comercio/entrar-comercio.component';
import {GestionPedidosComponent} from './Vistas/negocios/gestion-pedidos/gestion-pedidos.component';
import {GestionProductosComponent} from './Vistas/negocios/gestion-productos/gestion-productos.component';
import {SolicitudComponent} from './Vistas/negocios/solicitud/solicitud.component';

export const routes: Routes = [
  { path: '', component: BienvenidaComponent},
  { path: 'inicio-C/tipo1', component: InicioCComponent, data: { tipoUsuario: '1'} },
  { path: 'inicio-A/tipo2', component: InicioAComponent, data: { tipoUsuario: '2'} },
  { path: 'inicio-N/tipo3', component: InicioNComponent, data: { tipoUsuario: '3'} },
  { path: 'registro-C/tipo1', component: RegistroCComponent, data: { tipoRUsuario: '1'} },
  { path: 'registro-N/tipo3', component: RegistroNComponent, data: { tipoRUsuario: '3'} },
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'sidenavC', component: SidenavCComponent,
    children: [
      { path: 'entrar-comercio', component: EntrarComercioComponent},
    ]
  },
  { path: 'sidenavA', component: SidenavAComponent,
    children: [
      { path: 'gestion-admin', component: GestionAdminComponent},
      { path: 'gestion-afiliados', component: GestionAfiliadosComponent},
      { path: 'gestion-repartidores', component: GestionRepartidoresComponent},
      { path: 'gestion-tipo', component: GestionTipoComercioComponent},
      { path: 'reportes-c-ventas', component: ReporteCVentasComponent},
      { path: 'reportes-ventas-afiliado', component: ReporteVentasAfiliadoComponent},
    ]
  },
  { path: 'sidenavN', component: SidenavNComponent,
    children: [
      { path: 'gestion-pedidos', component: GestionPedidosComponent},
      { path: 'gestion-productos', component: GestionProductosComponent},
      { path: 'solicitud', component: SolicitudComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
