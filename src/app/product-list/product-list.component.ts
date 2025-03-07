import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Fetch Products
  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  // Delete Product

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product._id !== id);
      });
    }
  }
  
}
