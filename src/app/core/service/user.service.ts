import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IUsers } from "../interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint = 'users';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<IUsers>(`${environment.api}${this.endPoint}`);
  }

}
