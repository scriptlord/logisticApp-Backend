import postgres from "postgres";

export const sql = postgres(process.env.DATABASE_URL as string)

export async function testConnection(){
    try {
        const result = await sql`SELECT * FROM users LIMIT 2`
        console.log('database connected successfully', result)
    } catch (error) {
        console.error('database connection failed')
        console.error(error)
        process.exit(1)
    }
}
