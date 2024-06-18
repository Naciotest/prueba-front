import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcatenateService {
apiUrl = 'api/concatenate'

constructor(private http: HttpClient) { }

createStringConcatenate(left: string, right: string): Observable<string> {
  let params = new HttpParams().set('left', left).set('right', right);
  return this.http.post<string>(`${this.apiUrl}?left=${left}&right=${right}`, {params});
}

}
