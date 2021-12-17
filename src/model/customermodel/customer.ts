import { sql } from "../../db-config/postgres-connection";

export async function registerCustomer(
  name: string,
  address: string,
  phone: string,
  email: string,
  user_type: number
) {
  const [new_user] = await sql`
    insert into users (
      name,
      address,
      phone,
      email,
      user_type
    ) values (
        ${name},
        ${address},
        ${phone},
        ${email},
        ${user_type}
    )
    returning *
  `;
  return new Promise((resolve, reject) => {
    resolve(new_user);
  });
}

export async function bookOrder(
  customer_id: string,
  pick_address: string,
  delivery_address: string,
  product_name: string,
  product_category: string,
  recipient_name: string,
  order_status: string,
  weight: number
) {
  
  const [new_order] = await sql`
    insert into bookorder (
      customer_id,
      pick_address,
      delivery_address,
      product_name,
      product_category,
      recipient_name,
      order_status,
      weight
    ) values (
      ${customer_id},
      ${pick_address},
      ${delivery_address},
      ${product_name},
      ${product_category},
      ${recipient_name},
      ${order_status},
      ${weight}
    )
    returning *
  `;
  return new Promise((resolve, reject) => {
    resolve(new_order);
  });
}
