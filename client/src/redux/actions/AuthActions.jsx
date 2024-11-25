import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../Common/Confiuarations';

const API_URL = 'http://localhost:5000/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials,config);
      console.log(response,'login response')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData,config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserData = createAsyncThunk('user/getUserData', async (_, { rejectWithValue }) => {
  try {
      const { data } = await axios.get(`${API_URL}/auth/`, config)
      console.log(data, 'userData....');
      return data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const logoutUser=createAsyncThunk('user/logoutUserData',async(_,{rejectWithValue})=>{
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/logout`,
      {}, 
      {
          headers: {
              "Content-Type": "application/json"
          },
          withCredentials: true
      }
  );
    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})