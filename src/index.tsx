import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import styles, { SHEET_MARGIN_TOP } from './styles';

const App = () => {
	const sheetAnimation = useRef(new Animated.Value(SHEET_MARGIN_TOP)).current;
	const fabButtonAnimation = sheetAnimation.interpolate({
		inputRange: [SHEET_MARGIN_TOP, 0],
		outputRange: ['0deg', '45deg'],
	});

	const [sheetVisible, setSheetVisible] = useState(false);

	useEffect(() => {
		Animated.spring(sheetAnimation, {
			toValue: sheetVisible ? 0 : SHEET_MARGIN_TOP,
			useNativeDriver: false,
		}).start();
	}, [sheetVisible]);

	const onFABPress = useCallback(() => {
		setSheetVisible(prevState => !prevState);
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'light-content'} backgroundColor={'rgba(0,0,0,0.2)'} translucent={true} />
			<Header />
			<Animated.View style={[styles.contentContainer, { marginTop: sheetAnimation }]}>
				<TouchableOpacity onPress={onFABPress}>
					<Animated.View style={[styles.fabButton, { transform: [{ rotate: fabButtonAnimation }] }]}>
						<View style={styles.fabButtonIcon} />
					</Animated.View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default App;
