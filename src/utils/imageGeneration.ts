import OpenAI from 'openai';

// Check if the API key is available
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not set in the environment variables');
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (response.data && response.data[0] && response.data[0].url) {
      return response.data[0].url;
    } else {
      throw new Error('No image URL returned from the API');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function analyzeImage(imageUrl: string, originalPrompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Analyze the image concisely. Extract 3-5 key visual elements related to urban health, lifestyle, and community impact. Provide brief, comma-separated descriptions suitable for incorporation into the next image generation prompt."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Original prompt: ${originalPrompt}\n\nBased on this context, what are the most important visual elements to carry forward?`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    if (response.choices && response.choices[0] && response.choices[0].message) {
      return response.choices[0].message.content || '';
    } else {
      throw new Error('No analysis returned from the API');
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

// Helper function to encode image to base64 (if needed)
export async function encodeImageToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}