import pool from "../../server/mysql"; // นำเข้า pool จากไฟล์การเชื่อมต่อฐานข้อมูล

export async function POST(req) {
    const { name, CID } = await req.json(); // รับข้อมูลจากฟอร์ม

    // ตรวจสอบค่าที่ได้รับ
    if (!name || !CID) {
        return new Response(JSON.stringify({ error: 'Name and CID are required' }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const db = await pool.getConnection();
        const query = 'INSERT INTO `project` (`projectID`, `name`, `CID`) VALUES (NULL, ?, ?);';
        await db.execute(query, [name, CID]);
        db.release();
        return new Response(JSON.stringify({ message: 'Project created successfully' }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
