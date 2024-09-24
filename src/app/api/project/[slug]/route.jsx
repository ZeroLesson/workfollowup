import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql";

// ฟังก์ชัน GET เพื่อดึงข้อมูลโปรเจกต์
export async function GET(request) {
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // ได้ค่าจาก /api/project/{slug}

    try {
        const db = await pool.getConnection();

        const query = 'SELECT * FROM project WHERE CID=?';
        const [rows] = await db.execute(query, [slug]);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No assignments found' }, { status: 404 });
        }

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




