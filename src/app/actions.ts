'use server';

import {
  convertToSmartShape as convertToSmartShapeFlow,
  type ConvertToSmartShapeInput,
  type ConvertToSmartShapeOutput
} from '@/ai/flows/smart-shape';

type ActionResponse = ConvertToSmartShapeOutput | { error: string };

export async function convertToSmartShape(
  input: ConvertToSmartShapeInput
): Promise<ActionResponse> {
  try {
    // Basic validation
    if (!input.roughShapeDataUri || !input.roughShapeDataUri.startsWith('data:image/png;base64,')) {
        return { error: 'Invalid image data provided.' };
    }
    
    const result = await convertToSmartShapeFlow(input);
    return result;
  } catch (error) {
    console.error('Error in convertToSmartShape action:', error);
    // Return a user-friendly error message
    return { error: 'Failed to generate smart shape due to an internal error. Please try again.' };
  }
}
