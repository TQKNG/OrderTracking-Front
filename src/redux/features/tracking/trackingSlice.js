import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTracking,
  addNewTracking,
  deleteOneTracking,
  updateOneTracking,
} from "./trackingService";

const initialState = {
  status: "idle",
  data: [],
  error: {},
  filteredData:[],
  filteredOption:"All",
  showInput: false,
};

// API
// Get all tracking
export const getTracking = createAsyncThunk(
  "tracking/getAllTracking",
  async () => {
    return await getAllTracking();
  }
);

// Add a tracking
export const addTracking = createAsyncThunk(
  "tracking/addTracking",
  async (data) => {
    return await addNewTracking(data);
  }
);

// Delete a tracking
export const deleteTracking = createAsyncThunk(
  "tracking/deleteTracking",
  async (id) => {
    return await deleteOneTracking(id);
  }
);

// Update a tracking
export const updateTracking = createAsyncThunk(
  "tracking/updateTracking",
  async(data) =>{
    const trackingItem = {
      orderNumber: data.orderNumber,
      orderDate: data.orderDate,
      pickingDate: data.pickingDate,
      note: data.note,
      trackingStatus: data.trackingStatus,
    }
    return await updateOneTracking(data.id, trackingItem);
  }
)

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    SHOW_INPUT: (state, action) => {
      state.showInput = action.payload;
    },
    SET_FILTER_OPTION:(state,action)=>{
      state.filteredOption = action.payload;
    },
    FILTER_DATA:(state,action)=>{
      if(action.payload === "Delivered" || action.payload === "In Progress" ){
        state.filteredData = state.data.filter(item=>item.trackingStatus===action.payload);
      }
      else if(action.payload ==="All"){
        state.filteredData = state.data;
      }
      else{
        state.filteredData = state.data.filter((item)=>{
          return item.orderNumber.toLowerCase().includes(action.payload.searchString.toLowerCase());
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTracking.fulfilled, (state, action) => {
        state.status = "updated";
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(getTracking.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(getTracking.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addTracking.fulfilled, (state, action) => {
        state.status = "updated";
        const newTracking = action.payload;
        state.data.push(newTracking);
        state.filteredData = state.data;
      })
      .addCase(addTracking.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(addTracking.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteTracking.fulfilled, (state, action) => {
        state.status = "updated";
        const { _id } = action.payload;
        state.data = state.data.filter(
          (item) => item._id !== _id
        );
        state.filteredData = state.data;
      })
      .addCase(deleteTracking.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteTracking.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(updateTracking.fulfilled, (state, action) => {
        state.status = "updated";
        const newUpdateTracking = action.payload;
        state.data.map((item)=>{
          if(item._id === newUpdateTracking._id){
            item.orderNumber = newUpdateTracking.orderNumber;
            item.orderDate = newUpdateTracking.orderDate;
            item.pickingDate = newUpdateTracking.pickingDate;
            item.note = newUpdateTracking.note;
            item.trackingStatus = newUpdateTracking.trackingStatus;
          }
          return item;
        })
        state.filteredData = state.data;
      })
      .addCase(updateTracking.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateTracking.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { SHOW_INPUT, SET_FILTER_OPTION,FILTER_DATA } = trackingSlice.actions;
export default trackingSlice.reducer;
