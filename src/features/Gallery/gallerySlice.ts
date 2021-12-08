import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { IPhoto } from '../../interfaces/index'

export interface GalleryState {
	ids: number[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: GalleryState = {
	ids: [],
	status: 'idle',
};

export const gallerySlice = createSlice({
	name: 'gallery',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<IPhoto>) => {
			if (!state.ids.includes(action.payload.id)) {
				state.ids = [...state.ids, action.payload.id]
			} else {
				state.ids = state.ids.filter((ids: number) => ids !== action.payload.id)
			}
		}
	},
});

export const { toggleFavorite } = gallerySlice.actions;
export const getAllFavovites = (state: RootState) => state.gallery.ids;
export default gallerySlice.reducer;
