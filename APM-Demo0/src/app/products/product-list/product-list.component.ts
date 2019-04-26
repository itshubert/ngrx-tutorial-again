import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  componentActive = true;
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  sub: Subscription;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    // this.store.pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.componentActive))
    //   .subscribe(currentProduct => {
    //     this.selectedProduct = currentProduct;
    //   });
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.store.dispatch(new productActions.Load());

    // this.store.pipe(select(fromProduct.getProducts), takeWhile(() => this.componentActive))
    //   .subscribe(products => {
    //     console.log('new products!');
    //     this.products = products;
    //   });
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    // TODO: Unsubscribe
    // this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.componentActive))
    //   .subscribe(showProductCode => {
    //     this.displayCode = showProductCode;
    //   });
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
    // this.productService.changeSelectedProduct(product);
  }

}
