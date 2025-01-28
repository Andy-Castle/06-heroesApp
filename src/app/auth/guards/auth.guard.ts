import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => console.log('Authenticated', isAuthenticated)),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};

// Guardián CanActivate: Controla si una ruta puede ser activada
export const canActivateGuard: CanActivateFn = (
  // Snapshot de la ruta actual (contiene información de la ruta en este momento)
  route: ActivatedRouteSnapshot,
  // Snapshot del estado completo del router (incluye toda la información de navegación)
  state: RouterStateSnapshot
) => {
  // Debug: Mostrar en consola cuando se ejecuta este guardián
  //console.log('CanActivate');
  //console.log({ route, state }); // Imprimir detalles de la ruta y estado

  // Lógica de control de acceso (siempre deniega en este ejemplo)
  // En aplicación real aquí iría una condición (ej: verificar autenticación)
  return checkAuthStatus();
  // true = permitir acceso, false = bloquear acceso
};

// Guardián CanMatch: Controla si una ruta puede ser considerada para coincidir
export const canMatchGuard: CanMatchFn = (
  // Configuración de la ruta (definida en el RouterModule)
  route: Route,
  // Segmentos de la URL actual (partes de la URL divididas por '/')
  segments: UrlSegment[]
) => {
  // Debug: Mostrar en consola cuando se ejecuta este guardián
  //console.log('CanMatch');
  //console.log({ route, segments }); // Imprimir detalles de configuración y segmentos

  // Lógica para determinar si la ruta debe coincidir
  // En aplicación real podría usarse para evitar cargar módulos innecesarios
  return checkAuthStatus();
  // true = permitir coincidencia, false = evitar que la ruta coincida
};
