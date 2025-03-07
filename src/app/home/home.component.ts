import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [
      {
        name: 'Casual T-Shirt',
        description: 'Comfortable cotton t-shirt in multiple colors.',
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
        link: 'https://www.myntra.com/men-casual-shirts',
        offer: '20% OFF'
      },
      {
        name: 'Denim Jacket',
        description: 'Stylish denim jacket for all seasons.',
        image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg',
        link: 'https://www.myntra.com/men-denim-jackets',
        offer: '30% OFF'
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight and durable running shoes.',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
        link: 'https://www.myntra.com/men-running-shoes',
        offer: '50% OFF'
      },
      {
        name: 'Formals',
        description: 'Elegant formal shirt for office and parties.',
        image: 'https://images.pexels.com/photos/999267/pexels-photo-999267.jpeg',
        link: 'https://www.myntra.com/men-formal-shirts',
        offer: '25% OFF'
      },
      {
        name: 'Hoodie',
        description: 'Warm and comfortable hoodie for winter.',
        image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
        link: 'https://www.myntra.com/men-hoodies',
        offer: '40% OFF'
      },
    ];
  }
}
