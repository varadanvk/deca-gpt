import { NextResponse } from 'next/server'

export async function POST(req) {
  console.log('🎤 Transcribe API endpoint called')
  
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    
    console.log('📁 File received:', {
      name: file?.name || 'unknown',
      size: file?.size || 0,
      type: file?.type || 'unknown'
    })
    
    if (!file) {
      console.error('❌ No file in request')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Missing OpenAI API key')
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    // Create FormData for OpenAI
    const openaiFormData = new FormData()
    openaiFormData.append('file', file)
    openaiFormData.append('model', 'whisper-1')
    openaiFormData.append('language', 'en')
    openaiFormData.append('response_format', 'text')

    console.log('📡 Calling OpenAI Whisper API...')

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openaiFormData,
    })

    console.log('📨 OpenAI response:', {
      status: response.status,
      statusText: response.statusText
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ OpenAI API error:', errorText)
      return NextResponse.json(
        { error: 'OpenAI API failed', details: errorText }, 
        { status: 500 }
      )
    }

    const transcription = await response.text()
    console.log('✅ Transcription successful!')
    console.log('📝 Length:', transcription.length)
    console.log('📄 Preview:', transcription.substring(0, 100) + '...')
    
    return new NextResponse(transcription, { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    
  } catch (error) {
    console.error('💥 Transcription error:', error)
    return NextResponse.json({ 
      error: 'Transcription failed',
      details: error.message 
    }, { status: 500 })
  }
}