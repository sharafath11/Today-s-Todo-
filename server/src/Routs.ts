import express from "express"
import { Router } from "express-serve-static-core"
import { addTodo, completedTask, deleteTask, editTask, getTodos } from "./Controller";
const router:Router=express.Router();
router.get("/get-todos",getTodos);
router.post("/add-todo",addTodo);
router.post("/completed",completedTask)
router.post("/edit",editTask);
router.post("/delete",deleteTask);
export  default router