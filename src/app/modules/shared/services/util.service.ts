import { ElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keyloakService: KeycloakService) { }

  getRoles(){
    return this.keyloakService.getUserRoles();
  }

  isAdmin(){
    let roles = this.keyloakService.getUserRoles().filter(role => role == 'admin');

    if(roles.length > 0)
      return true;
    else
      return false;
  }
}
