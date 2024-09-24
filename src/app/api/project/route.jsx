import { NextResponse } from "next/server";
import pool from "../../server/mysql";

// export async function GET() {
//     try {
//         const db = await pool.getConnection()
//         const query = 'SELECT * FROM project'
//         const [rows] = await db.execute(query)
//         db.release()
        
//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }
export async function GET(request) {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM project';
        const [rows] = await db.execute(query);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(rows); // ตรวจสอบว่า rows ถูกต้องหรือไม่
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


