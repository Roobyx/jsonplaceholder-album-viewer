// Vendor
import React, { useState } from 'react';
// Custom
import Album from '../../components/Album'

const Gallery = () => {
	const [currentAlbum, setCurrentAlbum] = useState(1)
	const pages = [...new Array(100)]

	return (
		<>
			{/* Album selector in the header */}
			<header style={styles.header}>
				{/* Button switching between favorites album and album selector */}
				<div>
					{
						currentAlbum > 0 ? <button style={styles.button} onClick={() => setCurrentAlbum(0)}> ❤️ Favorites Album </button> : <button style={styles.button} onClick={() => setCurrentAlbum(1)}> Go to Album gallery </button>
					}
				</div>
				
				{/* Album selector with the option to type the album id or increment or decrement the current album id */}
				<div style={styles.albumSelectorContainer}>
					<h3>Select album:</h3>
					
					<div style={styles.albumSelector}>
						
						{/* The buttons can be disabled if they would overflow - visually the opacity will be lowered and functionally the pointer event will be disabled */}
						<div>
							<button style={{...styles.button, opacity: currentAlbum > 1 ? '1' : '.7', pointerEvents: currentAlbum > 1 ? 'auto' : 'none' }} onClick={() => setCurrentAlbum(currentAlbum - 1)}> {'<'} Previous page </button>
						</div>

						<input style={styles.numberInput} placeholder={currentAlbum > 0 ? currentAlbum.toString() : '❤️'} type="number" onChange={(e: any) => setCurrentAlbum(parseInt(e.target.value))} value={currentAlbum} />

						<button style={{...styles.button, opacity: currentAlbum < pages.length - 1 ? '1' : '.7', pointerEvents: currentAlbum < pages.length - 1 ? 'auto' : 'none' }} onClick={() => setCurrentAlbum(currentAlbum + 1)}> Next page {'>'} </button>
						
					</div>
				</div>

				{/* Indication of the current album mode */}
				<div style={styles.currentAlbumIndicator}>
					<div>Current album:</div>
					<div>{ currentAlbum > 0 ? currentAlbum : '❤️'}</div>
				</div>
			</header>

			{/* Container for the current album viewer - uses <Album> components */}
			{/* Needs property "album" that needs to be "Int" and is mentadory */}
			<main style={styles.albumContainer}>
				<Album album={currentAlbum} />
			</main>
		</>
	);
}

const styles = {
	header: {
		display: 'flex',
		backgroundColor: '#131417',
		height: '15vh',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	albumSelectorContainer: {
		display: 'flex',
		flexFlow: 'column',
		minWidth: '30vw',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumSelector: {
		height: '10vh',
		display: 'flex',
		flexFlow: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	albumContainer: {
		width: '100vw',
		height: '85vh',
		overflowY: 'scroll' as 'scroll',
		backgroundColor: '#1e1f26'
	},
	numberInput: {
		width: '60px',
		height: '30px',
		fontSize: '20px',
		textAlign: 'center' as 'right',
		border: '0px',
		borderRadius: '6px'

	},
	button: {
		backgroundColor: '#444857',
		border: 0,
		color: '#fff',
		cursor: 'pointer',
		padding: '10px',
		margin: '0 10px',
		borderRadius: '6px',
		minWidth: '120px'
	},
	startButton: {
		opacity: '.3'
	},
	currentAlbumIndicator: {
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '20px'
	}
}

export default Gallery;
