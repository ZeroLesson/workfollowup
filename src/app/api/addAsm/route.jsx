import { NextRequest, NextResponse } from "next/server";
import pool from "../../server/mysql";

export async function POST(request) {
    try {
        const body = await request.json();
        const { projectID, name, description, startDate, endDate, status, percent } = body;

        // Connect to the database
        const db = await pool.getConnection();

        // Corrected SQL query, ID will auto-increment, so it's not needed in VALUES
        const query = 'INSERT INTO `assignment` (`projectID`, `name`, `description`, `startDate`, `endDate`, `status`, `percent`) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [projectID, name, description, startDate, endDate, status, percent]);
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
