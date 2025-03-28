import { test, expect } from '@playwright/test';

// testing health
export default function health() {
    test("Health check", async ({ request }) => {
        const response = await request.get("/api/")
        const json = await response.json()

        expect(response.status()).toBe(200)
        // equal to has to match the expected response
        expect(json).toEqual({ message: 'Hello world!' })
    })
}