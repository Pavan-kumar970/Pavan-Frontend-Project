import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../services/product.service';  // ✅ Product Service

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  isAuthenticated: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'email', 'actions']; 
  dataSource = new MatTableDataSource<any>(); 
  totalUsers: number = 0;

  // ✅ Product Variables
  productColumns: string[] = ['name', 'price', 'category', 'actions'];
  productDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService, 
    private productService: ProductService,  // ✅ Inject Product Service
    private router: Router
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  

  ngOnInit() {
    this.updateUserState();
    this.loadUsers();
    this.loadProducts(); // ✅ Load Products
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.totalUsers = data.length; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.productDataSource.data = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(user => user._id !== userId);
        },
        (error: any) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.productDataSource.data = this.productDataSource.data.filter(product => product._id !== productId);
        },
        (error: any) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  private updateUserState() {
    this.userName = this.authService.getUserName();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
