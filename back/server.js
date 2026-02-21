const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { supabase } = require("./supabaseClient");

function mapRowToActivity(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        imgUrl: row.img_url,
        createdAt: row.created_at
    };
}

function isValidHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_error) {
        return false;
    }
}

function validateActivityInput({ title, description, imgUrl }) {
    if (typeof title !== "string" || title.trim().length < 3 || title.trim().length > 120) {
        return "El titulo debe tener entre 3 y 120 caracteres.";
    }
    if (typeof description !== "string" || description.trim().length < 10 || description.trim().length > 1000) {
        return "La descripcion debe tener entre 10 y 1000 caracteres.";
    }
    if (typeof imgUrl !== "string" || !isValidHttpUrl(imgUrl)) {
        return "La URL de imagen no es valida.";
    }
    return null;
}

function createServer() {
    const app = express();
    const allowedOrigin = process.env.CORS_ORIGIN || "*";

    app.use(cors({ origin: allowedOrigin }));
    app.use(express.json({ limit: "50kb" }));

    app.get("/api/health", (_req, res) => {
        res.json({ ok: true, timestamp: new Date().toISOString() });
    });

    app.get("/api/activities", async (_req, res) => {
        const { data, error } = await supabase
            .from("activities")
            .select("id,title,description,img_url,created_at")
            .order("created_at", { ascending: false });

        if (error) {
            return res.status(500).json({ error: "No se pudieron obtener actividades." });
        }

        return res.json(data.map(mapRowToActivity));
    });

    app.post("/api/activities", async (req, res) => {
        const { title, description, imgUrl } = req.body || {};
        const validationError = validateActivityInput({ title, description, imgUrl });

        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const { data, error } = await supabase
            .from("activities")
            .insert({
                title: title.trim(),
                description: description.trim(),
                img_url: imgUrl.trim()
            })
            .select("id,title,description,img_url,created_at")
            .single();

        if (error) {
            return res.status(500).json({ error: "No se pudo crear actividad." });
        }

        return res.status(201).json(mapRowToActivity(data));
    });

    app.delete("/api/activities/:id", async (req, res) => {
        const { id } = req.params;
        const { error } = await supabase.from("activities").delete().eq("id", id);

        if (error) {
            return res.status(500).json({ error: "No se pudo eliminar actividad." });
        }

        return res.status(204).send();
    });

    app.delete("/api/activities", async (_req, res) => {
        const { error } = await supabase.from("activities").delete().neq("id", "00000000-0000-0000-0000-000000000000");

        if (error) {
            return res.status(500).json({ error: "No se pudo limpiar actividades." });
        }

        return res.status(204).send();
    });

    return app;
}

if (require.main === module) {
    const port = Number(process.env.PORT || 3001);
    createServer().listen(port, () => {
        console.log(`API activa en http://localhost:${port}`);
    });
}

module.exports = { createServer };
