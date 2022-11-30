import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";

const fecthWithoutMocking = global.fetch

describe('app component when bringin joke', ()=> {
    
    beforeAll(()=> {
        global.fetch = vi.fn(()=> Promise.resolve({
            json: () => Promise.resolve(
                {
                    value: 'test joke'
                }
            )
        }))
    })

    beforeEach(cleanup)

    afterAll(()=> {
        global.fetch = fecthWithoutMocking
    })

    it('should render the component', async ()=> {
        await act(()=> render(<App />))
    })

    it('should make the call to the api, print the joke', async ()=> {
        await act(()=> render(<App />))
        screen.getByText('test joke')
    })
}
)

describe('app when creatin a joke of our own', ()=> {

    beforeAll(()=> {
        global.fetch = vi.fn(()=> Promise.resolve({
            json: () => Promise.resolve(
                {
                    value: 'new joke'
                }
            )
        }))
    })

    beforeEach(cleanup)

    afterAll(()=> {
        global.fetch = fecthWithoutMocking
    })

    it('should render an input', async ()=> {
        await act(()=> render(<App />))
        screen.getByRole('textbox')
    })

    it('should render a submit button', async ()=> {
        await act(()=> render(<App />))
        const button = screen.getByRole('button')
        expect(button.innerText).toBe('submit')

    })

    it('should paint the joke after submitting it', async ()=> {
        await act(()=> render(<App />))
        const expected = 'new joke'

        const input = screen.getByRole('textbox')

        userEvent.type(input, expected)

        const button = screen.getByRole('button')

        userEvent.click(button)

        screen.getByText(expected)
    })
})