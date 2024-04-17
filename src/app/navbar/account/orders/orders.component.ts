import { Component } from '@angular/core';
import { Cart } from '../../../interfaces/cart';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Cart[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.getOrders();
  }
  async getOrders() {
    const uid = sessionStorage.getItem('session-cookie');
    if (!uid) {
      return;
    }
    await this.db.getOrders(uid);
    this.orders = this.db.orders;
  }
}
