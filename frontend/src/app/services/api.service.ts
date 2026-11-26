import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  private images$?: Observable<Record<string, string | null>>;

  constructor(private http: HttpClient) {}

  getImages(): Observable<Record<string, string | null>> {
    return this.images$ ??= this.http.get<Record<string, string | null>>(`${this.base}/images`).pipe(
      catchError(() => of({})),
      shareReplay(1),
    );
  }

  getPages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/pages`).pipe(catchError(() => of([])));
  }

  getPage(slug: string): Observable<any> {
    return this.http.get(`${this.base}/pages/${slug}`);
  }

  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/faqs`);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/services`);
  }

  getTeam(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/team`);
  }

  getSettings(): Observable<any> {
    return this.http.get(`${this.base}/settings/public`);
  }

  submitContact(data: any): Observable<any> {
    return this.http.post(`${this.base}/contact`, data);
  }
}
