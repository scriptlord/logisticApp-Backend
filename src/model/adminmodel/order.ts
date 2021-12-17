import { sql } from "../../db-config/postgres-connection";

export async function getAllOrder() {
  const result = await sql`SELECT * FROM user_type`;
  return { response: "database connected successfully", result };
}
export async function addOrder(
  customer_id: any,
  pick_address: any,
  delivery_address: any,
  product_name: any,
  product_category: any,
  recipient_name: any,
  order_status: any,
  weight: number
) {
  const result = await sql`insert into bookorder(
    customer_id, pick_address, delivery_address, product_name, 
    product_category, recipient_name, order_status, order_date, weight)
	values (${customer_id}, ${pick_address}, ${delivery_address}, ${product_name},
     ${product_category},${recipient_name},${order_status}, ${weight})`;
  return { response: "database connected successfully", result };
}

export async function addUserType(name?: string) {
  const [new_user] = await sql`
  insert into user_type (
  id,  name
  ) values (
  10,'customer'
  ),
  (20,'admin'),
  ( 30,'driver')
  returning *
`;
  return new Promise((resolve, reject) => {
    resolve(new_user);
  });
}
export async function confirmOrder(orderid: string) {
  const [new_order] = await sql`
  update bookorder 
  set order_status='confirmed'
  where id=${orderid}
  returning *
`;
  return new Promise((resolve, reject) => {
    resolve(new_order);
  });
}

export async function getAllCustomer() {
  const [...new_order] = await sql`
  select * from users
  where user_type=10
`;
  return new Promise((resolve, reject) => {
    resolve(new_order);
  });
}

export async function getAllDriver() {
  const [...new_order] = await sql`
  select * from users
  where user_type=20
`;
  return new Promise((resolve, reject) => {
    resolve(new_order);
  });
}
export async function getAllPendingOrders() {
  const [...new_order] = await sql`
  select * from bookorder
  where order_status='pending'
`
  return new Promise((resolve, reject) => {
    resolve(new_order);
  });
}
