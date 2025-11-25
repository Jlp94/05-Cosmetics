import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiCosmeticosResponse, Cosmetico, Cosmeticos, MessageCosmeticosResponse} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CosmeticService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/';
  private readonly types = {
    allCosmetics: 'all',
    pageCosmetic: 'paged?page=',
    limitCosmetic: "&limit=",
    oneCosmetic: 'detail/',
    insertCosmetic: 'addOne',
    nameCosmetic: 'cosmeticoByName/',
    updateCosmetic: 'updateOne/',
    deleteCosmetic: 'deleteOne/',
  };

  getAllCosmeticos( ):Observable<Cosmeticos> {
    return this.http.get<Cosmeticos>( this.baseUrl+this.types.allCosmetics );
  }
  getPaginationCosmetico( page : number , limit : number):Observable<ApiCosmeticosResponse> {
    return this.http.get<ApiCosmeticosResponse>( this.baseUrl+this.types.pageCosmetic + page + this.types.limitCosmetic + limit );
  }
  getOneCosmetico( id : string):Observable<Cosmetico> {
    return this.http.get<Cosmetico>( this.baseUrl + this.types.oneCosmetic+ id );
  }
  getCosmeticoByName(name : string):Observable<Cosmetico[]> {
    return this.http.get<Cosmetico[]>( this.baseUrl + this.types.nameCosmetic + name );
  }
  postCosmetico( cosmetico: Cosmetico ):Observable<MessageCosmeticosResponse> {
    return this.http.post<MessageCosmeticosResponse>( this.baseUrl + this.types.insertCosmetic, cosmetico );
  }
  patchCosmetico(cosmetico: Cosmetico ):Observable<MessageCosmeticosResponse> {
    return this.http.patch<MessageCosmeticosResponse>( this.baseUrl +this.types.updateCosmetic + cosmetico._id, cosmetico );
  }
  deleteCosmetico(id:string):Observable<MessageCosmeticosResponse> {
    return this.http.delete<MessageCosmeticosResponse>( this.baseUrl + this.types.deleteCosmetic + id );
  }


}
