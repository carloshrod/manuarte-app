import { FormInstance } from 'antd';
import { z, ZodSchema } from 'zod';

const baseUserSchema = z.object({
	dni: z.string().regex(/^\d+$/, 'El documento debe contener solo números'),
	phoneNumber: z
		.string()
		.regex(/^\d+$/, 'El # de teléfono debe contener solo números'),
	email: z.string().email('Email inválido'),
	password: z
		.string()
		.min(8, 'La contraseña debe tener al menos 8 caracteres')
		.regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
		.regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
		.regex(/[0-9]/, 'La contraseña debe tener al menos un número')
		.regex(
			/[!@#$%&*_+\-.]/,
			'La contraseña debe tener al menos un carácter especial (!@#$%&*_+-.)'
		)
});

export const createStaffSchema = z.object({
	dni: baseUserSchema.shape.dni,
	email: baseUserSchema.shape.email,
	password: baseUserSchema.shape.password
});

export const editStaffSchema = z.object({
	dni: baseUserSchema.shape.dni,
	email: baseUserSchema.shape.email,
	password: baseUserSchema.shape.password.optional()
});

export const customerSchema = z.object({
	dni: baseUserSchema.shape.dni,
	phoneNumber: baseUserSchema.shape.phoneNumber,
	email: baseUserSchema.shape.email.optional().or(z.literal('')).or(z.null())
});

export const validateForm = async (
	values: any,
	schema: ZodSchema,
	form: FormInstance
) => {
	try {
		await schema.parseAsync(values);
		return true;
	} catch (err) {
		if (err instanceof z.ZodError) {
			form.setFields(
				err.errors.map(error => ({
					name: error.path[0],
					errors: [error.message]
				}))
			);
		} else {
			console.error('Unexpected error:', err);
		}
		return false;
	}
};
