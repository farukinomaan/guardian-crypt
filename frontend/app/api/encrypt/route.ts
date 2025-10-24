import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    console.log(`[Encrypt API] Connecting to backend: ${backendUrl}/encrypt`);
    
    const response = await fetch(`${backendUrl}/encrypt`, {
      method: 'POST',
      body: formData,
    });

    console.log(`[Encrypt API] Backend response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Encrypt API] Backend error:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorData.error || 'Encryption failed' },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { error: errorText || 'Encryption failed' },
          { status: response.status }
        );
      }
    }

    const blob = await response.blob();
    const headers = new Headers();
    
    // Forward content-disposition header for filename
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      headers.set('content-disposition', contentDisposition);
    }
    
    headers.set('content-type', 'application/octet-stream');

    console.log('[Encrypt API] Success! Returning encrypted file');
    return new NextResponse(blob, {
      status: 200,
      headers: headers,
    });

  } catch (error: any) {
    console.error('[Encrypt API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to encryption service. Is the Python backend running on port 5000?',
        details: error.message 
      },
      { status: 500 }
    );
  }
}