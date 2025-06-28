'use server';

/**
 * @fileOverview Smart shape conversion AI agent.
 *
 * - convertToSmartShape - A function that handles the shape conversion process.
 * - ConvertToSmartShapeInput - The input type for the convertToSmartShape function.
 * - ConvertToSmartShapeOutput - The return type for the convertToSmartShape function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertToSmartShapeInputSchema = z.object({
  roughShapeDataUri: z
    .string()
    .describe(
      "A data URI of the rough shape drawing that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  shapeType: z
    .string()
    .optional()
    .describe("The type of shape to convert to, e.g., 'rectangle', 'circle', 'triangle'. If not specified, the AI will attempt to determine the shape type automatically."),
});

export type ConvertToSmartShapeInput = z.infer<typeof ConvertToSmartShapeInputSchema>;

const ConvertToSmartShapeOutputSchema = z.object({
  smartShapeDataUri: z
    .string()
    .describe("A data URI of the converted smart shape that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  shapeType: z
    .string()
    .describe('The type of shape that was identified and converted to.'),
});

export type ConvertToSmartShapeOutput = z.infer<typeof ConvertToSmartShapeOutputSchema>;

export async function convertToSmartShape(input: ConvertToSmartShapeInput): Promise<ConvertToSmartShapeOutput> {
  return convertToSmartShapeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertToSmartShapePrompt',
  input: {schema: ConvertToSmartShapeInputSchema},
  output: {schema: ConvertToSmartShapeOutputSchema},
  prompt: `You are an AI expert in converting rough drawings into clean, geometrically precise shapes.

You will receive a rough drawing as a data URI and your task is to convert it into a smart shape, returning the result as a data URI.

Shape Type Hint: {{shapeType}}

Rough Shape: {{media url=roughShapeDataUri}}

Ensure the output smart shape is a clean, geometrically precise representation of the input rough shape.

Consider the Shape Type Hint provided, if any, to guide the conversion process.
`,
});

const convertToSmartShapeFlow = ai.defineFlow(
  {
    name: 'convertToSmartShapeFlow',
    inputSchema: ConvertToSmartShapeInputSchema,
    outputSchema: ConvertToSmartShapeOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',

      prompt: [
        {media: {url: input.roughShapeDataUri}},
        {text: `Convert this rough shape into a clean, geometrically precise shape. Return the converted shape as a data URI. Shape type hint: ${input.shapeType || 'None'}.`},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    return {
      smartShapeDataUri: media.url,
      shapeType: input.shapeType || 'Inferred',
    };
  }
);
