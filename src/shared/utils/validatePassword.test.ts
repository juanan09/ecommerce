import { describe, it, expect } from 'vitest';
import { validatePassword } from './validatePassword';

describe('validatePassword', () => {
    it('fails with less than 12 characters', () => {
        const result = validatePassword('Short1!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must be at least 12 characters long');
        expect(result.strength).toBe('weak');
    });

    it('fails without uppercase letter', () => {
        const result = validatePassword('lowercase123!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one uppercase letter');
        expect(result.strength).toBe('weak');
    });

    it('fails without lowercase letter', () => {
        const result = validatePassword('UPPERCASE123!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one lowercase letter');
        expect(result.strength).toBe('weak');
    });

    it('fails without number', () => {
        const result = validatePassword('NoNumberPass!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one number');
        expect(result.strength).toBe('weak');
    });

    it('fails without special character', () => {
        const result = validatePassword('NoSpecialChar1');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one special character');
        expect(result.strength).toBe('weak');
    });

    it('returns strength "medium" for valid passwords with 12-15 characters', () => {
        const result = validatePassword('ValidPass123!'); // 13 chars
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.strength).toBe('medium');
    });

    it('returns strength "strong" for valid passwords with 16+ characters', () => {
        const result = validatePassword('VeryStrongPassword123!'); // 22 chars
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.strength).toBe('strong');
    });

    it('accumulates multiple errors', () => {
        const result = validatePassword('weak');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must be at least 12 characters long');
        expect(result.errors).toContain('Password must contain at least one uppercase letter');
        expect(result.errors).toContain('Password must contain at least one number');
        expect(result.errors).toContain('Password must contain at least one special character');
        expect(result.strength).toBe('weak');
    });
});
