import express from "express";
import productsRouter from "../../routes/products.router.js";
import cartRouter from "../../routes/cart.router.js";
import viewsRouter from "../../routes/views.router.js";
import { __dirname } from "../../utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// ROUTES
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado`);
  });
});

export default socketServer;
