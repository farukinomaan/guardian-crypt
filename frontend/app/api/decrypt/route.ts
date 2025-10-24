import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    
    const response = await fetch(`${backendUrl}/decrypt`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Decryption failed' },
        { status: response.status }
      );
    }

    const blob = await response.blob();
    const headers = new Headers();
    
    // Forward content-disposition header for filename
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      headers.set('content-disposition', contentDisposition);
    }
    
    headers.set('content-type', 'application/octet-stream');

    return new NextResponse(blob, {
      status: 200,
      headers: headers,
    });

  } catch (error: any) {
    console.error('Decrypt API route error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to decryption service' },
      { status: 500 }
    );
  }
}