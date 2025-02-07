import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Category, Product, Student, User } from '../models/general';

@Injectable({ providedIn: 'root' })
export class CategoryService extends GenericService<Category> {
  // Dummy data for demonstration
  protected override items: Category[] = [
    { id: '1', name: 'Electronics', description: 'Electronic devices and accessories' },
    { id: '2', name: 'Books', description: 'Physical and digital books' },
    { id: '3', name: 'Clothing', description: 'Apparel and fashion items' }
  ];
}

@Injectable({ providedIn: 'root' })
export class ProductService extends GenericService<Product> {
  protected override items: Product[] = [
    { id: '1', name: 'Laptop', price: 999.99, categoryId: '1' },
    { id: '2', name: 'Smartphone', price: 599.99, categoryId: '1' },
    { id: '3', name: 'JavaScript Book', price: 39.99, categoryId: '2' }
  ];
}

@Injectable({ providedIn: 'root' })
export class StudentService extends GenericService<Student> {
  protected override items: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', grade: 85 },
    { id: '2', firstName: 'Jane', lastName: 'Smith', grade: 92 },
    { id: '3', firstName: 'Bob', lastName: 'Johnson', grade: 78 }
  ];
}

@Injectable({ providedIn: 'root' })
export class UserService extends GenericService<User> {
  protected override items: User[] = [
    { id: '1', username: 'john_doe', email: 'john@example.com', role: 'user' },
    { id: '2', username: 'admin', email: 'admin@example.com', role: 'admin' },
    { id: '3', username: 'jane_smith', email: 'jane@example.com', role: 'user' }
  ];
}