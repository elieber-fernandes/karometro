import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { matricula, name, image } = await request.json();

        if (!matricula || !name || !image) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Remove header from base64 string if present (e.g., "data:image/jpeg;base64,")
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Create filename
        // Sanitize name to remove spaces or special chars if needed, though user asked for "Matricula_Nome.jpg"
        // Assuming input name is already formatted or we format it here. 
        // Let's ensure it matches the requested format strictly.
        const filename = `${matricula}_${name}.jpg`;

        // Define path
        const uploadDir = path.join(process.cwd(), 'public', 'photos');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        // Write file
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: `/photos/${filename}`,
            filename: filename
        });

    } catch (error) {
        console.error('Error saving photo:', error);
        return NextResponse.json(
            { error: 'Failed to save photo' },
            { status: 500 }
        );
    }
}
