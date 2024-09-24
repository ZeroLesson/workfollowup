import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql";

export async function GET(request) {
    // ดึง slug จาก URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // ได้ค่าจาก /api/users/{slug}

    try {
        const db = await pool.getConnection();
        
        const query = 'SELECT DISTINCT * FROM `member` NATURAL JOIN `project` WHERE member.userID = ?';
        const [rows] = await db.execute(query, [slug]);
        db.release();
        
        // ตรวจสอบว่ามีผลลัพธ์หรือไม่
        if (rows.length === 0) {
            return NextResponse.json({ message: 'No assignments found' }, { status: 404 });
        }

        // ส่งข้อมูล JSON กลับเป็น array ของ rows
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
