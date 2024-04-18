import { Component } from '@angular/core';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from '../../../shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';

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
