import cors from "cors";
import express from "express";
import connection from "./db/Connections.js";
import userDetail from "./User/UserDetail.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', dataRoutes);

connection.then(() => {
    app.listen(8080, () => {
        console.log("Server started at port 8080");
    });
});