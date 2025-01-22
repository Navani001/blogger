import { validateURL } from "../../../lib/utilis/ValidUrl";



describe('validateURL', () => {
    it('should return "URL is required" for empty string', () => {
        expect(validateURL('')).toBe('URL is required');
        expect(validateURL('   ')).toBe('URL is required');
    });

    it('should return error for URLs with spaces', () => {
        expect(validateURL('test url')).toBe('URL cannot contain spaces');
    });

    it('should return error for special characters', () => {
        expect(validateURL('test@url')).toBe('URL cannot contain special characters except - and _');
        expect(validateURL('test#url')).toBe('URL cannot contain special characters except - and _');
    });

    it('should validate URL length', () => {
        expect(validateURL('ab')).toBe('URL must be at least 3 characters long');
        expect(validateURL('a'.repeat(51))).toBe('URL must be less than 50 characters');
    });

    it('should not allow hyphens at start or end', () => {
        expect(validateURL('-testurl')).toBe('URL cannot start or end with a hyphen');
        expect(validateURL('testurl-')).toBe('URL cannot start or end with a hyphen');
    });

    it('should not allow consecutive hyphens', () => {
        expect(validateURL('test--url')).toBe('URL cannot contain consecutive hyphens');
    });

    it('should only allow valid characters', () => {
        expect(validateURL('test$url')).toBe('URL cannot contain special characters except - and _');
        expect(validateURL('valid-url_123')).toBe('valid');
    });

    it('should accept valid URLs', () => {
        expect(validateURL('my-blog-post')).toBe('valid');
        expect(validateURL('test_123')).toBe('valid');
        expect(validateURL('validURL123')).toBe('valid');
    });
});