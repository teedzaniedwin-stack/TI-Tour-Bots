import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Botswana Tourism Hub API is running" });
  });

  // Mock Auth & Data for Demo (Since Supabase keys aren't provided yet)
  // In a real app, these would interact with Supabase
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock logic
    if (email.includes("admin")) {
      res.json({ user: { id: "1", name: "Admin User", role: "admin", email } });
    } else if (email.includes("business")) {
      res.json({ user: { id: "2", name: "Safari Lodge", role: "business", email } });
    } else {
      res.json({ user: { id: "3", name: "John Tourist", role: "tourist", email } });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
