import { Component } from '@angular/core';
import { Cart } from '../../../../interfaces/cart';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../../services/database.service';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';


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
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.orderIdSub = this.route.params.subscribe(params => {
      this.id = params['id'];

      for (let order of this.db.orders) {
        if (order.id === this.id) {
          this.order = order;
        }
      }
      this.order.date = this.order.date instanceof firebase.firestore.Timestamp ? this.order.date.toDate() : this.order.date;
    });
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe();
  }
}
