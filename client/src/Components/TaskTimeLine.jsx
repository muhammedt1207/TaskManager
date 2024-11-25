// export const TaskTimeline = ({ tasks }) => {
//     const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
//     return (
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Timeline</h2>
//         <div className="relative">
//           {sortedTasks.map((task, index) => (
//             <div key={task._id} className="flex mb-4">
//               <div className="flex-none w-24 text-sm text-gray-600">
//                 {new Date(task.dueDate).toLocaleDateString()}
//               </div>
//               <div className="relative flex-grow pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
//                 <div className="bg-white p-3 rounded-lg shadow">
//                   <h3 className="font-medium">{task.title}</h3>
//                   <p className="text-sm text-gray-600">{task.status}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };