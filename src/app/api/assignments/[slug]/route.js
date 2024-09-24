import { NextRequest, NextResponse } from "next/server";
import pool from '../../../server/mysql';

export async function GET(request) {
    // Extract slug (assignment ID) from URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // Get the ID from /api/assignment/{slug}

    try {
        const db = await pool.getConnection();

        // Adjusted query with correct field references
        const query = `
            SELECT 
                project.name AS projectName,
                assignment.ID AS assignmentID,
                assignment.name AS assignmentName,
                assignment.description,
                assignment.startDate,
                assignment.endDate,
                assignment.status,
                assignment.percent
            FROM 
                project
            LEFT JOIN 
                assignment 
            ON 
                project.projectID = assignment.projectID
            WHERE 
                assignment.ID = ?
        `;
        const [rows] = await db.execute(query, [slug]);
        db.release();

        // Check if any results returned
        if (rows.length === 0) {
            return NextResponse.json({ message: 'No assignments found' }, { status: 404 });
        }

        // Return results as JSON
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching assignment:", error);
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
