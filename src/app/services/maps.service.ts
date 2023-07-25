import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private httpClient: HttpClient) { }

  getCoordinatesByAddress(address: string) {
    return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDRyKDE6s5HrL-M7V0NscC2yZguqx5OUok`)
    //return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAcuxi-oRtrzrIlhUtzTStjMxnyMsMGwqk`)

  }

}
