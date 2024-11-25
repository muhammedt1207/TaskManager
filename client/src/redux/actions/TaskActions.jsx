import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../Common/Confiuarations';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch Tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters = {}, { getState,rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.auth?.user?._id; 
      console.log(userId,'000000000000000')
      if (!userId) {
        console.error('User ID not found in state');
        return rejectWithValue('User ID is required to fetch tasks');
      }
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.sort) params.append('sortBy', filters.sort);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      console.log(params.toString(), 'Query Params');

      const response = await axios.get(`${API_URL}/tasks/${userId}?${params.toString()}`, config);
      console.log(response.data, 'Fetched Tasks');
      return response.data;
    } catch (error) {
      console.error(error, 'Error fetching tasks');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Create Task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, config);
      dispatch(fetchTasks());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/tasks/${taskData.id}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresh tasks list after updating a task
      dispatch(fetchTasks());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const changeTaskStatus = createAsyncThunk(
  'tasks/changeTaskStatus',
  async ({ taskId, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresh tasks list after status change
      dispatch(fetchTasks());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`,config);
      dispatch(fetchTasks());
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
