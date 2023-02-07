import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

export interface IHeart {
	onSend:(id: string, isLike: boolean)=>Promise<void>,
	status: boolean ,
	width?: number,
	id: string
}

const ExplodingHeart = (props: IHeart) => {
	const {onSend, status, width, id} = props;
	const [isFavorite, setFavorite] = useState(false)
	const [animation, setAnimation] = useState<LottieView | null>(null)

	useEffect(() => {
		if (isFavorite) {
			animation?.play()
		} else {
			animation?.reset()
		}
	}, [isFavorite])

	useEffect(() => {
		setFavorite(status)
	}, [status])

	const toggleStatus = () => {
			onSend(id, !isFavorite);
		setFavorite(!isFavorite)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => toggleStatus()}>
				<LottieView
					speed={1.5}
					autoPlay={false}
					loop={false}
					resizeMode='contain'
					style={{ width: 100 }}
					ref={(animation) => setAnimation(animation)}
					source={require('../../assets/lottie/explodingHeart.json')}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default ExplodingHeart