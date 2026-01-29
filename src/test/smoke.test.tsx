import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

describe('Smoke Test', () => {
    it('should have jsdom environment', () => {
        const element = document.createElement('div')
        expect(element).toBeDefined()
    })

    it('should support JSX', () => {
        render(<div>Hello</div>)
    })
})
