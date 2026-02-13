
import { cartReducer } from './cartReducer';
import { describe, it, expect } from 'vitest';

describe('cartReducer', () => {
    it('returns current state for unknown action type', () => {
        const initialState = { items: [] };
        // Cast to any to simulate runtime behavior with unknown action
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const action = { type: 'UNKNOWN_ACTION' } as any;
        const newState = cartReducer(initialState, action);
        expect(newState).toBe(initialState);
    });
});
