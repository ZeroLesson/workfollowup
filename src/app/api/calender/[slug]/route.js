import { NextResponse } from "next/server";
import pool from '../../../server/mysql';

export async function GET(request) {
    // Extract the slug from the URL to get the user ID
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // Assuming this extracts user ID from /api/users/{userID}

    if (!slug) {
        return NextResponse.json({ message: 'User ID not provided' }, { status: 400 });
    }

    try {
        // Get a connection from the pool
        const db = await pool.getConnection();

        // Query to fetch the necessary data based on user ID
        const query = `
            SELECT 
                user.ID as userID,
                project.name as projectName,
                assignment.ID as assignmentID,
                assignment.name as assignmentName,
                assignment.startDate,
                assignment.endDate,
                assignment.status,
                assignment.percent
            FROM user
            LEFT JOIN project ON user.ID = project.CID
            LEFT JOIN assignment ON project.projectID = assignment.projectID
            WHERE assignment.percent < 100 AND user.ID = ?
        `;

        // Execute the query with the userID as a parameter
        const [rows] = await db.execute(query, [userID]);

        // Release the database connection back to the pool
        db.release();

        // If no rows are found, return a 404 response
        if (rows.length === 0) {
            return NextResponse.json({ message: 'No assignments found' }, { status: 404 });
        }

        // Return the result as JSON
        return NextResponse.json(rows);
    } catch (error) {
        // Catch any database errors and return a 500 response with an error message
        return NextResponse.json({
            error: 'Database query failed: ' + error.message
        }, { status: 500 });
    }
}
