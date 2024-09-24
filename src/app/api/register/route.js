import prisma from "@/helpers/prisma";  
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { ID, role, email, password, phone } = await request.json();

    if (!ID || !role || !email || !password || !phone) {
      return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json({ message: "มี Email นี้ในระบบแล้ว" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ID: ID,
        role: role,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone
      }
    });

    const { password: _, ...result } = user;
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาดในการลงทะเบียน" }, { status: 500 });
  }
}
