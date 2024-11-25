import { createSlice } from "@reduxjs/toolkit";
import { changeTaskStatus, createTask, deleteTask, fetchTasks, updateTask } from "../actions/TaskActions";

const dummyTasks = [
    {
      _id: '1',
      title: 'Complete Project Proposal',
      description: 'Draft and submit the Q4 project proposal to the management team',
      status: 'In Progress',
      dueDate: '2024-12-01',
      priority: 'High',
      category: 'Work',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Weekly Team Meeting',
      description: 'Regular sync-up with the development team to discuss progress',
      status: 'To Do',
      dueDate: '2024-11-24',
      priority: 'Medium',
      category: 'Meetings',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:00:00.000Z'
    },
    {
      _id: '3',
      title: 'Code Review',
      description: 'Review pull requests for the new feature implementation',
      status: 'Completed',
      dueDate: '2024-11-22',
      priority: 'High',
      category: 'Development',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-21T15:30:00.000Z'
    },
    {
      _id: '4',
      title: 'Update Documentation',
      description: 'Update API documentation with new endpoints',
      status: 'To Do',
      dueDate: '2024-11-25',
      priority: 'Low',
      category: 'Documentation',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:00:00.000Z'
    },
    {
      _id: '5',
      title: 'Bug Fix: Login Issue',
      description: 'Investigate and fix the user login validation bug',
      status: 'In Progress',
      dueDate: '2024-11-23',
      priority: 'High',
      category: 'Bugs',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-22T09:15:00.000Z'
    },
    {
      _id: '6',
      title: 'Client Meeting Preparation',
      description: 'Prepare presentation and demos for the client meeting',
      status: 'To Do',
      dueDate: '2024-11-26',
      priority: 'Medium',
      category: 'Meetings',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:00:00.000Z'
    },
    {
      _id: '7',
      title: 'Performance Testing',
      description: 'Run performance tests on the new API endpoints',
      status: 'Completed',
      dueDate: '2024-11-21',
      priority: 'Medium',
      category: 'Testing',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-21T16:45:00.000Z'
    },
    {
      _id: '8',
      title: 'Security Audit',
      description: 'Conduct monthly security audit of the application',
      status: 'To Do',
      dueDate: '2024-11-28',
      priority: 'High',
      category: 'Security',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:00:00.000Z'
    }
  ];
  
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
      tasks: [],
      loading: false,
      error: null,
      currentTask: null,
      filters: {
        status: '',
        priority: '',
        date: null,
      },
      stats: {
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0,
      },
    },
    reducers: {
      setFilters: (state, action) => {
        state.filters = { ...state.filters, ...action.payload };
      },
      clearFilters: (state) => {
        state.filters = {
          status: '',
          priority: '',
          date: null,
        };
      },
      setCurrentTask: (state, action) => {
        state.currentTask = action.payload;
      },
      clearCurrentTask: (state) => {
        state.currentTask = null;
      },
      updateTaskStats: (state) => {
        state.stats = {
          total: state.tasks.length,
          completed: state.tasks.filter(task => task.status === 'Completed').length,
          inProgress: state.tasks.filter(task => task.status === 'In Progress').length,
          todo: state.tasks.filter(task => task.status === 'To Do').length,
        };
      },
      clearTaskState: (state) => {
        state.tasks = [];
        state.currentTask = null;
        state.error = null;
        state.loading = false;
        state.filters = {
          status: '',
          priority: '',
          date: null,
        };
        state.stats = {
          total: 0,
          completed: 0,
          inProgress: 0,
          todo: 0,
        };
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch Tasks
        .addCase(fetchTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = action.payload;
          state.error = null;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to fetch tasks';
        })
  
        // Create Task
        .addCase(createTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks.push(action.payload);
          state.error = null;
        })
        .addCase(createTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to create task';
        })
  
        // Update Task
        .addCase(updateTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.tasks.findIndex(task => task._id === action.payload._id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
          state.error = null;
        })
        .addCase(updateTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to update task';
        })
  
        // Delete Task
        .addCase(deleteTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = state.tasks.filter(task => task._id !== action.payload);
          state.error = null;
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to delete task';
        })
        .addCase(changeTaskStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(changeTaskStatus.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.tasks.findIndex(task => task._id === action.payload._id);
          if (index !== -1) {
            state.tasks[index].status = action.payload.status; 
          }
          state.error = null;
        })
        .addCase(changeTaskStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Failed to change task status';
        });
    },
  });
  
//   // Action Creators
//   export const {
//     setFilters,
//     clearFilters,
//     setCurrentTask,
//     clearCurrentTask,
//     updateTaskStats,
//     clearTaskState,
//   } = taskSlice.actions;
  
//   // Selectors
//   export const selectAllTasks = (state) => state.tasks.tasks;
//   export const selectTaskById = (state, taskId) => 
//     state.tasks.tasks.find(task => task._id === taskId);
//   export const selectTasksByStatus = (state, status) =>
//     state.tasks.tasks.filter(task => task.status === status);
//   export const selectTaskStats = (state) => state.tasks.stats;
//   export const selectTasksLoading = (state) => state.tasks.loading;
//   export const selectTasksError = (state) => state.tasks.error;
//   export const selectCurrentTask = (state) => state.tasks.currentTask;
//   export const selectTaskFilters = (state) => state.tasks.filters;
  
  export default taskSlice.reducer;