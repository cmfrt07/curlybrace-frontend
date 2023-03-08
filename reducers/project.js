import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	value: {
        user: 'user token',
        title: '',
        shortDescription: '',
        description: '',
        banner: '',
        images: [],
        location: {
            name: '',
            lat: null,
            lon: null,
        },
        tags: [],
        isPaid: false,
        isHelp: false,
        language: '',
        level: '',
        isPro: false,
        dateStart: new Date(),
        dateEnd: new Date(),
	}	
};

export const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
        /*
		login: (state, action) => {
			state.value.isConnected = true;
			state.value.username = action.payload;
		},

		logout: (state, action) => {
			state.value.isConnected = false;
			state.value.username = null;
		}
        */
       create: (state, action) => {
        //state.value = action.payload;
       },
	},
});

export const { create } = projectSlice.actions;
export default projectSlice.reducer;