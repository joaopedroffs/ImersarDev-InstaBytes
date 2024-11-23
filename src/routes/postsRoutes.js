import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configura o armazenamento de arquivos enviados pelo usuário
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo no destino
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads" , storage});
// Se está usando linux ou mac não precisa do storage

const routes = (app) => {
  // Permite que o servidor interprete requisições com corpo no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota para buscar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;