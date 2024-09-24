import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone } = body;
    const id = "000000"; // ระบุ ID แบบคงที่ หรือนำไปใช้จาก params
    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get("id");
    // ตรวจสอบว่า id, email, และ phone ไม่เป็นค่าว่างหรือ null
    if (!id || !email || !phone) {
      throw new Error("ID, email, or phone is missing or invalid");
    }

    // Connect to the database
    const db = await pool.getConnection();

    // ปรับให้แน่ใจว่า ID, email, และ phone ถูกใช้ในรูปแบบที่ถูกต้อง
    const query = 'UPDATE `user` SET `email` = ?, `phone` = ? WHERE `user`.`ID` = ?;';
    const [result] = await db.execute(query, [email, phone, id]);

    db.release(); // Always release the connection

    // ตรวจสอบผลลัพธ์การอัปเดต
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found or no changes made" }, { status: 404 });
    }

    // ส่งผลลัพธ์กลับ
    return NextResponse.json({ message: "Profile updated successfully", result });
  } catch (error) {
    console.error("Database error:", error); // Log the error for better debugging
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
