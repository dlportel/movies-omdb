import {HttpErrorResponse, HttpParams} from '@angular/common/http';

export class Helpers {

  /*
  *
  * Elimina en profundidad todos las propiedades del objeto que sean null, sean un arreglo de longitud 0 o una funcion
  * Si todos las propiedades son null, elimina la propiedad padre.
  * No evalua objetos dentro de ARRAY
  * */
  static removeNulls<T>(obj: { [key: string]: any }): T {
    try {
      let index = 0;
      let deleted = 0;
      for (const key in obj) {
        index++;
        if (obj[key] === null || obj[key] === undefined || obj[key] instanceof Function || (obj[key] instanceof Array && obj[key].length === 0)) {
          delete obj[key];
          deleted++;
        } else if (obj[key] instanceof Object && !(obj[key] instanceof Array) && !(obj[key] instanceof Date)) {
          const result = this.removeNulls(obj[key]);
          result === null ? delete obj[key] : obj[key] = result;
        }
      }
      if (index === deleted) {
        return null;
      }
      return obj as T;
    } catch (err) {
      return obj as T;
    }
  }

  static handleError(error: any): string {
    let errorMessage = '';
    if (typeof error?.Error === 'string') {
      errorMessage = error.Error;
    } else if (typeof error?.message === 'string') {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error.error instanceof ErrorEvent || (error instanceof HttpErrorResponse && error.error.message)) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return errorMessage;
  }

  static appendDataToParams(data: { [key in string]: any }): HttpParams {
    let params = new HttpParams();
    if (data) {
      for (const key in data) {
        if (key) {
          params = params.append(key, data[key]);
        }
      }
    }
    return params;
  }
}
