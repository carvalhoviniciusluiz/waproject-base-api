import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

function rand(min: number, max: number) {
  const float = Math.random() * (max - min) + min;
  return Math.floor(float);
}

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 0) return;

  for (let x = 0; x < 100; x++) {
    const description = faker.commerce.productMaterial();
    const price = Number(faker.commerce.price());

    const order: IOrder = {
      userId: rand(1, 100),
      description,
      quantity: rand(1, 10),
      price,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
