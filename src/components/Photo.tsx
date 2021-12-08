// Vendor
import React from 'react'
import { useSelector } from 'react-redux'
// Redux store
import { toggleFavorite } from '../features/Gallery/gallerySlice'
import { useAppDispatch } from '../redux/hooks'
import { RootState } from '../redux/store'
// Custom
import { IPhoto } from '../interfaces/index'

// Component to handle a single photo from an album
// Receives prop "photoData" of type IPhoto that has all the possible data from the API
const Photo = ({photoData}: {photoData: IPhoto}) => {
	const dispatch = useAppDispatch()
	// Get favorited photos from Redux and compares if the given image is in the array
	// Result is boolean
	const isFavorited = useSelector((state: RootState) => state.gallery.ids.includes(photoData.id))

	return (
		// Single photo
		<div style={styles.singlePhoto}>
			{/* Handles the favoriting option, visually by checking agains the isFavorite array and functionaly by using the "toggleFavorite" action from the Redux store*/}
			<div onClick={()=> dispatch(toggleFavorite(photoData))} style={styles.favButton}> 
				{
					isFavorited ? <div> ❤️ </div> : <div>🖤</div>
				}
			</div>

			{/* Using the received photoData renders the image */}
			<img style={styles.image} key={photoData.id} src={photoData.thumbnailUrl} alt={photoData.title} />

			{/* Using the received photoData renders the image title */}
			<div style={styles.photoTitle}>
				{photoData.title}
			</div>
		</div>
	)
}

const styles = {
	singlePhoto: {
		position: 'relative' as 'relative'
	},
	image: {
		borderRadius: '6px'
	},
	favButton: {
		position: 'absolute' as 'absolute',
		top: '2px',
		left: '2px',
		padding: '3px',
		borderRadius: '6px',
		border: '1px solid #444857',
		backgroundColor: 'rgba(214, 209, 209, 0.6)',
		cursor: 'pointer'
	},
	photoTitle: {
		position: 'absolute' as 'absolute',
		bottom: '4px',
		left: '0',
		right: '0',
		backgroundColor: 'rgba(0,0,0, .6)',
		padding: '4px 10px',
		overflow: 'hidden' as 'hidden',
		textOverflow: 'ellipsis' as 'ellipsis',
		whiteSpace: 'nowrap' as 'nowrap',
		borderBottomLeftRadius: '6px',
		borderBottomRightRadius: '6px'
	}
}

export default Photo
