// Vendor
import React, { useEffect, useState } from 'react'
// Redux
import { useSelector } from 'react-redux'
// Redux store
import { RootState } from '../redux/store'
// Custom
import Photo from './Photo'

// Selector for favorites
// Result is array of Int type
const selectFavorites = (state: RootState) => state.gallery.ids

// Component to render an album of images
// Receives a prop of type Int for requested  album ID 
// If the album id is 0 or lower it will display the "Favorites" album
const Album = ({album}:{album: number}) => {
	const favorites = useSelector(selectFavorites)

	// Local state for the photo album
	const [photos, setPhotos] = useState([{}])
	// Local state for the loading state of the album photos
	const [photosLoading, setPhotosLoading] = useState(true)

	// Handles the fetching from the jsonplaceholder API
	// albumId helps for the selection of the album
	// if there is favIds provided the function will fetch only images with the included in the array IDs
	const fetchPhotos = async (albumId: number, favIds?: number[]) => {
		setPhotosLoading(true)

		let fetchUrl = `http://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
		
		if(favIds?.length) {
			fetchUrl = `http://jsonplaceholder.typicode.com/photos?`
			
			favIds.forEach( (id: number ) => {
				fetchUrl += `&id=${id}`
			})
		}

		try {
			const response = await fetch(fetchUrl)
			const data = await response.json()
			setPhotos(data)
			setPhotosLoading(false)
			return data
		} catch (error) {
			setPhotosLoading(false)
			return error
		}
	}
	
	useEffect(() => {
		if(album > 0) {
			fetchPhotos(album)
		} else {
			fetchPhotos(0, favorites)
		}
	}, [album, favorites])

	return (
		album < 1 ? (
			<>
			{/* Case for the favorites album */}
				{
					photos.length ? (
						!photosLoading ? (<div style={styles.albumViewer}>{
							photos.map( (photo: any) => <Photo key={photo.id} photoData={photo} /> )
						} </div>) : <div style={styles.message}> Loading </div>
					) : (
						<div style={styles.message}>
							This feels empty... try adding some favorite images from albums 1 to 100
						</div>
					)
				}
			</>
		) : (
			<>
			{/* Case for the album selector */}
				{
					photos.length ? (
						!photosLoading ? (<div style={styles.albumViewer}>{
							photos.map( (photo: any) => <Photo key={photo.id} photoData={photo} /> )
						} </div>) : <div style={styles.message}> Loading </div>
					) : (
						<div style={styles.message}>
							There is no such album. Please select an album between 1 and 100
						</div>
					)
				}
			</>
		)
	)
}

const styles = {
	albumViewer: {
		width: '98vw',
		maxWidth: '1125px',
		backgroundColor: '#1e1f26',
		color: '#fff',
		gap: '1vw',
		margin: '20px auto',
		display: 'grid',
		textAlign: 'center' as 'center',
		gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 60px))'
	},
	message: {
		width: '100%',
		height: '80vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '30px'
	}
}

export default Album