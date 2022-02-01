import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthStateService } from "../service/state/auth.state";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authState: AuthStateService) {}

  canActivate() {
    return this.authState.authenticated$;
  }
}
