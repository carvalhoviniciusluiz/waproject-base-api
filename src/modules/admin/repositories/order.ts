import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { Page, QueryBuilderType, Transaction } from 'objection';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

@Injectable()
export class OrderRepository {
  public async save(model: IOrder, currentUser: ICurrentUser, transaction?: Transaction): Promise<Order> {
    model.userId = currentUser.id;
    return Order.query(transaction).insert(model);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let page = params.page;
    if (page < 1) page = 1;
    const offset = (page - 1) * params.pageSize;

    const [row, results] = await Promise.all([
      this.getOrderQuery(params, transaction, false)
        .count('*')
        .first(),
      this.getOrderQuery(params, transaction)
        .select([
          'Order.id',
          'Order.description',
          'Order.quantity',
          'Order.price',
          'Order.createdDate',
          'Order.updatedDate',
          'User.email'
        ])
        .leftJoin('User', function() {
          this.on('User.id', '=', 'Order.userId');
        })
        .offset(offset)
        .limit(params.pageSize)
    ]);

    return {
      total: Number((<any>row).count),
      results
    };
  }

  private getOrderQuery(params: IPaginationParams, transaction?: Transaction, orderBy = true): QueryBuilderType<Order> {
    let query = Order.query(transaction);

    if (orderBy && params.orderBy) {
      query = query.orderBy(`Order.${params.orderBy}`, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }
}
