import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql";

export async function GET(request) {
    // ดึง slug จาก URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // ได้ค่าจาก /api/users/{slug}
    
    try {
        const db = await pool.getConnection();
        
        const query = 'SELECT DISTINCT assignment.ID, assignment.projectID, assignment.name, assignment.description, assignment.startDate, assignment.endDate, assignment.status, assignment.percent FROM `project` INNER JOIN member INNER JOIN assignment WHERE member.userID = ? and assignment.percent != 100;';
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
