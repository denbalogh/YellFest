import pg from "pg";

// Client config comes from .env
export const pool = new pg.Pool();
