import { WebSocketServer } from 'ws';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Servir archivos estáticos
app.use(express.static(join(__dirname, '../public')));

// Crear servidor HTTP/WebSocket
const server = app.listen(8080, () => {
    console.log('Servidor en http://localhost:8080');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    setInterval(() => {
        ws.send(JSON.stringify({
            time: Date.now(),
            flux: Math.random() * 0.1
        }));
    }, 50);
});