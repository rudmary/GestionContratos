import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// ngx libraries
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

// Angular Browser
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/List';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContratosComponent } from './views/contratos/contratos.component';
import { SideNavComponent } from './views/sidenav/sidenav.component';
import { DatosGeneralesComponent } from './views/datosGenerales/datosGenerales.component';
import { ActasComponent } from './views/actas/actas.component';
import { EntregablesComponent } from './views/entregables/entregables.component';
import { GarantiasComponent } from './views/garantias/garantias.component';
import { InformesComponent } from './views/informes/informes.component';
import { ModificacionesComponent } from './views/modificaciones/modificaciones.component';
import { MultasComponent } from './views/multas/multas.component';
import { PagosComponent } from './views/pagos/pagos.component';
import { SolicitudComponent } from './views/solicitud/solicitud.component';
import { VencimientosComponent } from './views/vencimientos/vencimientos.component';
import { ConsultaComponent } from './views/consultaGenerica/consulta.component';
import { ReporteComponent } from './views/reportes/reporte.component';
import { HistorialComponent } from './views/historial/historial.component';
import { CatalogoComponent } from './catalogo/catalogo/catalogo.component';
import { MenuComponent } from './catalogo/menu/menu.component';
import { RolComponent } from './catalogo/rol/rol.component';
import { UsuarioComponent } from './catalogo/usuario/usuario.component';
import { TipoCategoriaComponent } from './catalogo/tipoCategoria/tipo-categoria.component';
import { NuevoContratoComponent } from './views/nuevo-contrato/nuevo-contrato.component';

import { ContratosService } from './views/contratos/contratos.service';
import { NgbModal, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Forms
import { FormGarantiaComponent } from './formularios/formGarantia/form-garantia.component';
import { FormEntregableComponent } from './formularios/formEntregable/form-entregable.component';
import { FormInformeComponent } from './formularios/formInforme/form-informe.component';
import { FormActaComponent } from './formularios/formActa/form-acta.component';
import { FormMultaComponent } from './formularios/formMulta/form-multa.component';
import { FormRolComponent } from './formularios/formRol/form-rol.component';
import { FormUsuarioComponent } from './formularios/formUsuario/form-usuario.component';
import { FormSeccionComponent } from './formularios/formSeccion/form-seccion.component';
import { FormTipoComponent } from './formularios/formTipo/form-tipo.component';
import { FormSolicitudComponent } from './formularios/formSolicitud/form-solicitud.component';

//Pipes
import { FiltroContratoPipe } from './pipes/filtro-contrato.pipe';
import { SiteGuard } from './services/guards/site-guard.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContratosComponent,
    SideNavComponent,
    DatosGeneralesComponent,
    ActasComponent,
    EntregablesComponent,
    GarantiasComponent,
    InformesComponent,
    ModificacionesComponent,
    MultasComponent,
    PagosComponent,
    SolicitudComponent,
    VencimientosComponent,
    ConsultaComponent,
    CatalogoComponent,
    TipoCategoriaComponent,
    RolComponent,
    UsuarioComponent,
    MenuComponent,
    ReporteComponent,
    HistorialComponent,
    NuevoContratoComponent,
    FormGarantiaComponent,
    FormEntregableComponent,
    FormInformeComponent,
    FormActaComponent,
    FormMultaComponent,
    FormSeccionComponent,
    FormTipoComponent,
    FormUsuarioComponent,
    FormRolComponent,
    FormSolicitudComponent,
    FiltroContratoPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'contratos', component: ContratosComponent, canActivate: [SiteGuard] },
      //{ path: 'datosGenerales/:i', component: DatosGeneralesComponent },
      { path: 'datosGenerales', component: DatosGeneralesComponent, canActivate: [SiteGuard] },
      { path: 'garantias', component: GarantiasComponent , canActivate: [SiteGuard]},
      { path: 'actas', component: ActasComponent , canActivate: [SiteGuard]},
      { path: 'entregables', component: EntregablesComponent , canActivate: [SiteGuard]},
      { path: 'informes', component: InformesComponent , canActivate: [SiteGuard]},
      { path: 'modificaciones', component: ModificacionesComponent , canActivate: [SiteGuard]},
      { path: 'multas', component: MultasComponent , canActivate: [SiteGuard]},
      { path: 'pagos', component: PagosComponent , canActivate: [SiteGuard]},
      { path: 'solicitud', component: SolicitudComponent , canActivate: [SiteGuard]},
      { path: 'vencimientos', component: VencimientosComponent , canActivate: [SiteGuard]},
      { path: 'consulta', component: ConsultaComponent , canActivate: [SiteGuard]},
      { path: 'reportes', component: ReporteComponent , canActivate: [SiteGuard]},
      { path: 'historial', component: HistorialComponent , canActivate: [SiteGuard]},
      { path: 'Configuracion', component: CatalogoComponent , canActivate: [SiteGuard]},
      { path: 'tipos-categoria', component: TipoCategoriaComponent , canActivate: [SiteGuard]},
      { path: 'usuarios', component: UsuarioComponent , canActivate: [SiteGuard]},
      { path: 'roles', component: RolComponent , canActivate: [SiteGuard]},
      { path: 'registrar-contrato', component: NuevoContratoComponent , canActivate: [SiteGuard]},
    ])
  ],
  providers: [ContratosService, NgbActiveModal, MatNativeDateModule, MatDatepickerModule, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [
    FormGarantiaComponent,
    FormEntregableComponent,
    FormInformeComponent,
    FormActaComponent,
    FormMultaComponent,
    FormSeccionComponent,
    FormTipoComponent,
    FormUsuarioComponent,
    FormRolComponent,
    FormSolicitudComponent
  ],
  exports: [
    FiltroContratoPipe
  ]
})
export class AppModule { }
