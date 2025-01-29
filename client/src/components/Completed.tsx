import React from 'react';
import { TODOS } from '../servises';
interface PropInterFace{
  todos:TODOS,
  handleDelete:void
}

const Completed:React.FC<PropInterFace> = ({todos,handleDelete}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
     

      <ul className="list-none">
        <li className="flex items-center justify-between p-3 border border-green-400 rounded-lg mb-4 bg-green-50 hover:bg-green-100 transition duration-300 ease-in-out">
          <span className="text-lg font-semibold text-green-700">{todos.todo}</span>
          <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-lg shadow-sm">
            Completed
          </span>
          <button
                className="px-4 py-2 text-xs text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleDelete(todos._id)}
              >
                Delete 🗑
              </button>
        </li>
      </ul>
    </div>
  );
};

export default Completed;
