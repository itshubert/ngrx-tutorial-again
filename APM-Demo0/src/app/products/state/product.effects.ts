import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService) {}

    @Effect()
    loadProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap(
            (action: productActions.Load) => {
                return this.productService.getProducts()
                .pipe(
                    map((products: Product[]) => new productActions.LoadSuccess(products)),
                    catchError(err => of(new productActions.LoadFail(err)))
                );
            }
        )
    );

    // code below is equivalent as above
    // @Effect()
    // loadProduct$ = this.actions$.pipe(
    //     ofType(productActions.ProductActionTypes.Load),
    //     mergeMap(
    //         (action: productActions.Load) => this.productService.getProducts()
    //         .pipe(
    //             map((products: Product[]) => new productActions.LoadSuccess(products))
    //         )
    //     )
    // );

    @Effect()
    updateProduct: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => {
            // return this.productService.updateProduct(product)
            // .pipe(
            //     map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
            //     catchError(err => of(new productActions.UpdateProductFail(err)))
            // );

            if (product.id === 0) {
                return this.productService.createProduct(product).pipe(
                    map(savedProduct => {
                        return new productActions.UpdateProductSuccess(savedProduct);
                    }),
                    catchError(err => of(new productActions.UpdateProductFail(err)))
                );
            } else {
                return this.productService.updateProduct(product).pipe(
                    map(savedProduct => {
                        return new productActions.UpdateProductSuccess(savedProduct);
                    }),
                    catchError(err => of(new productActions.UpdateProductFail(err)))
                );
            }
        })
    );
}
