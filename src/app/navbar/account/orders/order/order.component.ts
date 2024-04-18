import { Component } from '@angular/core';
import { Cart } from '../../../../shared/interfaces/cart';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  order: Cart = {} as Cart;
  id: string = '';
  orderIdSub: Subscription = {} as Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderIdSub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      for (let order of this.orderService.orders) {
        if (order.id === this.id) {
          this.order = order;
        }
      }
      this.order.date =
        this.order.date instanceof firebase.firestore.Timestamp
          ? this.order.date.toDate()
          : this.order.date;
    });
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe();
  }
}
