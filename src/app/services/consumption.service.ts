import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Consumptions } from '../models/consumptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  constructor() { }

  // getConsumptionHistory(userId: number): Observable<Consumptions[]> {
  //   return this.http.get<Consumptions[]>(`${this.baseUrl}consumption/history/${userId}`);
  // }

//   getConsumptionHistory(userId: number): Observable<Consumptions[]> {
//     const url = `${this.baseUrl}consumption/history/${userId}`;
//     console.log('Fetching consumption history from:', url);
//     return this.http.get<Consumptions[]>(url);
// }

getConsumptionHistory(userId: number): Observable<Consumptions[]> {
  return this.http.get<Consumptions[]>(`${this.baseUrl}consumption/history/${userId}`);
}

}
