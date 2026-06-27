import { pool } from "@/lib";
export async function QueryExecuter(sql, values = []) {
  try {
    const [results] = await pool.execute(sql, values);
    return results;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
}
