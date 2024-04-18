import { Component } from '@angular/core';
import { Cart } from '../../../interfaces/cart';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Cart[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }
  async getOrders() {
    const uid = sessionStorage.getItem('session-cookie');
    if (!uid) {
      return;
    }
    await this.orderService.getOrders(uid);
    this.orders = this.orderService.orders;
  }
}
