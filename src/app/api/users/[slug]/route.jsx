import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql";

export async function GET(request) {
    // ดึง slug จาก URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // ได้ค่าจาก /api/users/{slug}
    
    try {
        const db = await pool.getConnection();
        
        const query = 'SELECT * FROM user WHERE ID = ?';
        const [rows] = await db.execute(query, [slug]);
        db.release();
        
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        if (rows.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
