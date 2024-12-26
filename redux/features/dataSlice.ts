import { IDataState } from "@/interface/store.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({
    page,
    limit,
    section,
  }: {
    page: number;
    limit: number;
    section: string;
  }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${section}?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    const totalCount = parseInt(
      response.headers.get("x-total-count") || "0",
      10
    );
    return { data, totalCount, section };
  }
);

const initialState: IDataState = {
  users: [],
  posts: [],
  comments: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  currentSection: "users",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state[
          action.payload.section as keyof Pick<
            IDataState,
            "users" | "posts" | "comments"
          >
        ] = action.payload.data;
        state.currentPage = action.meta.arg.page;
        state.totalPages = Math.ceil(
          action.payload.totalCount / action.meta.arg.limit
        );
        state.currentSection = action.meta.arg.section;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentSection } = dataSlice.actions;

export default dataSlice.reducer;
