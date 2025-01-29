import { Request, Response } from "express";
import { todoModal } from "./todoModel";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await todoModal.find();
        res.json({ ok: true, todos, msg: "This is todos" });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.json({ok:false, msg: "Internal Server Error" });
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { todo } = req.body;
        console.log(req.body)
        const newTodo = new todoModal({ todo });
        const savedTodo = await newTodo.save();
        res.json({ ok: true, todo: savedTodo, msg: "Todo added successfully" });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const completedTask=async(req:Request,res:Response)=>{
   const {id}=req.body
   try {
    await todoModal.findOneAndUpdate({_id:id},{
        status:true
    },{new:true})
    res.json({ok:true,msg:"Todo updated"})
   } catch (error) {
    res.json({ok:false,msg:"server Error"})
   }
}
export const deleteTask=async(req:Request,res:Response)=>{
    const {id}=req.body
    try {
        await todoModal.findByIdAndDelete({_id:id});res.json({ok:true,msg:"deleted succes fulll"})
    } catch (error) {
        res.json({ok:false,msg:"server error"})
    }
}
export const editTask=async(req:Request,res:Response)=>{
    const {id,todo}=req.body;
    try {
        await todoModal.findOneAndUpdate({_id:id},{
            todo:todo
        },{new:true})
        res.json({ok:true,msg:"Todo updated"})
       } catch (error) {
        res.json({ok:false,msg:"server Error"})
       }
}