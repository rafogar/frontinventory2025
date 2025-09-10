import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ProductService } from '../../shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category','picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
        .subscribe((data: any) => {
          console.log('respuesta productos: ', data);
          this.processProductResponse(data);
    }, (error: any) => {
      console.log(error);
    })
  }

  processProductResponse(resp: any) {
    const dataProduct: ProductElement[] = [];

    if(resp.metadata[0].code == '00'){
      console.log("resp.product.products", resp.product.products);
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+element.picture;
        dataProduct.push(element);
      });

      //set datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

}

export interface ProductElement {
  id: number;
  name: string;
  price:  number;
  account: number;
  category: any;
  picture: any;
}
