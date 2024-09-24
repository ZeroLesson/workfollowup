import { NextResponse } from "next/server";
import pool from '../../server/mysql';

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM user LEFT JOIN project on user.ID = project.userID LEFT JOIN assignment on project.ID = assignment.projectID where assignment.percent < 100 ");
      //"SELECT * FROM user LEFT JOIN project on user.ID = project.userID LEFT JOIN assignment on project.ID = assignment.projectID where assignment.projectID < 100 "
        // const db = pool.getConnection()
        // const query = "SELECT * FROM user LEFT JOIN project on user.ID = project.userID LEFT JOIN assignment on project.ID = assignment.projectID where assignment.projectID < 100 "
        // const [rows] = await db.execute(query)
        // db.release();
        // console.error(rows);
        // return NextResponse.json(rows)
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    } catch (error) {
        // return NextResponse.json({
        //     error: error
        // }, { status: 500 })
        return new Response(JSON.stringify({ error: 'Database query failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}