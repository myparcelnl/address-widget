import { z } from 'zod';

export function postalCodeLookupSchema() {
  return z.object({
    postalCode: z
      .string()
      .regex(/^[0-9]{4}\s*[a-zA-Z]{2}$/, { message: 'validation.postalCode' }),
    houseNumber: z
      .string()
      .regex(/^\d+$/, { message: 'validation.houseNumber' }),
    houseNumberSuffix: z.string().optional().nullable(),
  });
}
