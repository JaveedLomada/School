import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await query(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC'
    );
    return NextResponse.json({ ok: true, data: rows });
  } catch (err: string) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get('name') || '').trim();
    const address = String(form.get('address') || '').trim();
    const city = String(form.get('city') || '').trim();
    const state = String(form.get('state') || '').trim();
    const contact = String(form.get('contact') || '').trim();
    const email_id = String(form.get('email_id') || '').trim();
    const imageFile = form.get('image') as File | null;

    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json({ ok: false, error: 'All fields required' }, { status: 400 });
    }

    // Save image in /public/schoolImages
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imagesDir = path.join(process.cwd(), 'public', 'schoolImages');
    await fs.mkdir(imagesDir, { recursive: true });

    const ext = path.extname(imageFile.name) || '.jpg';
    const safeBase = path.basename(imageFile.name, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}_${safeBase}${ext}`;
    const filePath = path.join(imagesDir, filename);
    await fs.writeFile(filePath, buffer);

    // ✅ forward slash path for browser
    const relPath = `/schoolImages/${filename}`;

    await query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, Number(contact), relPath, email_id]
    );

    return NextResponse.json({ ok: true, message: 'School added successfully.' });
  } catch (err: unknown) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
