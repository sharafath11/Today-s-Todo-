import axios from "axios";

let baseUrl: string = "http://localhost:3000/";
export interface TODOS{
    _id:string
    todo:string,
    status:string,
    createdAt:string,
    updatedAt:string
  }
export const getRequest = async (url:string): Promise<TODOS[]> => {
    try {
        const response = await axios.get(`${baseUrl}${url}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
    }
};
export const postRequest = async (url:string,todo:{}): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}${url}`, todo);
        return response.data; 
    } catch (error) {
        console.error("Error sending data:", error);
        throw new Error("Failed to send data");
    }
};
