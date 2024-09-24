import { NextRequest, NextResponse } from "next/server";
import pool from "../../../server/mysql"; // Import your database pool

// This function will update assignment percent and status
export async function PUT(request) {
    try {
        const { percent, status } = await request.json();
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop(); // Extract the assignment ID from the URL

        if (!id || percent === undefined || !status) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const db = await pool.getConnection();
        const query = "UPDATE assignment SET percent = ?, status = ? WHERE ID = ?";
        const [result] = await db.execute(query, [percent, status, id]);
        db.release(); // Always release the connection

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "No assignment found with this ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "Assignment updated successfully" });
    } catch (error) {
        console.error("Error updating assignment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
