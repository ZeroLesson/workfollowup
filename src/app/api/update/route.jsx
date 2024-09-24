// import { NextRequest, NextResponse } from "next/server";
// import pool from "@/app/server/mysql";

// export async function PUT(request) {
//     const data = await request.json();
//     console.log("Data received from client:", data);
    
//     try {
//         const db = await pool.getConnection();
//         const query = 'UPDATE user SET email = ?, phone = ? WHERE ID = ?';
//         const [result] = await db.execute(query, [email, phone, ID]); // ใช้ ID ที่ถูกต้อง

//         db.release();
        
//         if (result.affectedRows === 0) {
//             return NextResponse.json({ message: 'User not found or no changes made' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'User updated successfully' });
//     } catch (error) {
//         console.error("Database error:", error);
//         return NextResponse.json({ error: "An error occurred while updating user data." }, { status: 500 });
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import pool from "../../server/mysql";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email,phone } = body;

        // Connect to the database
        const db = await pool.getConnection();

        // Corrected SQL query to match the column count with value count
        const query = 'UPDATE `user` SET `email` = ?, `phone` = ? WHERE `user`.`ID` = ?;';
        const [result] = await db.execute(query, [email,phone]);
        db.release(); // Always release the connection

        // Send the result back
        return NextResponse.json({ message: 'Assignment created successfully', result });
    } catch (error) {
        console.error(error); // Log the error for better debugging
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}


  
