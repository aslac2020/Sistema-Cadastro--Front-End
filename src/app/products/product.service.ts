import {Injectable} from "@angular/core";
import {IProduct} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Environment} from "@angular/cli/lib/config/workspace-schema";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/products`).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<IProduct>{
    console.log(id)
    return this.http.get<IProduct>(`${this.url}/products/${id}`).pipe(
      tap(data => console.log('Id', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    }else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage);
    return throwError(()=> errorMessage)
  }

  saveProduct(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>(`${this.url}/products`, product).pipe(
      tap( data => console.log('Product', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct>{
    return this.http.put<IProduct>(`${this.url}/products/${id}`, product).pipe(
      tap(data => console.log('Product', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: number): Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.url}/products/${id}`).pipe(
      tap(data => console.log('Delete Product', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
}
