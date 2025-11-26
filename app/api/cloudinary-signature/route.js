// app/api/cloudinary-signature/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    // For unsigned uploads, we don't need signature
    return NextResponse.json({
      cloudName,
      uploadPreset,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload configuration' },
      { status: 500 }
    );
  }
}