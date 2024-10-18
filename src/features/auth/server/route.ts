import { Hono } from "hono";

const app = new Hono()
.post("/login", (c) => {
    return c.json({
       success: "Ok" 
    });
})

export default app;