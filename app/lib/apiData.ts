import {  API_END_POINT, } from "./constant";
import {  FetchResponse } from "./type";





//  Authorized fetch function for post data
export const fetchAuthorized = async <T = undefined>(
    url: string,
    token: string,
    method: "GET" | "POST" = "GET",
    body?: T // Generic type T for the body, default to undefined
): Promise<FetchResponse> => {
    try {
        const options: RequestInit = {
            method: method, // Pass the HTTP method (GET, POST, etc.)
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 },
            cache: "no-store"

        };

        // Add body for POST requests
        if (method === "POST" && body) {
            options.body = JSON.stringify(body); // Convert the body to JSON string
        }

        const response = await fetch(`${API_END_POINT}${url}`, options);

        if (!response.ok) {
            throw new Error("Failed to Fetch Products");
        }

        const data = await response.json();

        // Handle GET and POST response structures
        if (method === "GET") {
            return data
        } else if (method === "POST") {
            return data
        }

        // Default case to ensure a return value
        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", data: error.message }; // Handle the error message
        } else {
            return { status: "error", data: "An unknown error occurred" };
        }
    }
};

//  Authorized fetch function for post data
export const fetchWithoutAuth = async <T = undefined>(
    url: string,
    method: "GET" | "POST" = "GET",
    body?: T // Generic type T for the body, default to undefined
): Promise<FetchResponse> => {
    try {
        const options: RequestInit = {
            method: method, // Pass the HTTP method (GET, POST, etc.)
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 },
            cache: "no-store"

        };

        // Add body for POST requests
        if (method === "POST" && body) {
            options.body = JSON.stringify(body); // Convert the body to JSON string
        }

        const response = await fetch(`${API_END_POINT}${url}`, options);

        if (!response.ok) {
            throw new Error("Failed to Fetch Products");
        }

        const data = await response.json();

        // Handle GET and POST response structures
        if (method === "GET") {
            return data
        } else if (method === "POST") {
            return data
        }

        // Default case to ensure a return value
        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", data: error.message }; // Handle the error message
        } else {
            return { status: "error", data: "An unknown error occurred" };
        }
    }
};


