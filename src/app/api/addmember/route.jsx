import { NextRequest, NextResponse } from "next/server";
import pool from "../../server/mysql";

export async function POST(request) {
    try {
        const body = await request.json();
        const { projectID,userID,role,joinDate } = body;

        // Connect to the database
        const db = await pool.getConnection();

        // Corrected SQL query to match the column count with value count
        const query = 'INSERT INTO `member` ( `projectID`, `userID`, `role`, `joinDate`) VALUES (?, ?, NULL, NOW());';
        const [result] = await db.execute(query, [projectID,userID]);
        db.release(); // Always release the connection

        // Send the result back
        return NextResponse.json({ message: 'Added successfully', result });
    } catch (error) {
        console.error(error); // Log the error for better debugging
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}