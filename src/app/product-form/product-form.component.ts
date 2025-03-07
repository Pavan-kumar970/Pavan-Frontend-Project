import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: ''
  };

  constructor(private productService: ProductService, private router: Router) {}

  saveProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        alert('✅ Product added successfully!');
        console.log('Product added:', response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('❌ Error adding product:', error);
        alert('Error adding product. Check console for details.');
      }
    );
  }
}
