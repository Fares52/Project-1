import { createPool } from '@vercel/postgres';
import {POSTGRES_URL} from '$env/static/private';


export async function load({}){
    const pool = createPool({
        connectionString: POSTGRES_URL,
      });
    //attempt to get foods from user table return nothing if table does not exist or error
    const {rows} = await pool.sql`SELECT * FROM foods`
    console.log(rows)
    return {foods:rows}
}

