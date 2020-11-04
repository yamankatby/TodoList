import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Animated,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const TodoList = () => {
	const [createSheetVisible, setCreateSheetVisible] = useState(false);

	const slideAnimation = useRef(new Animated.Value(createSheetMarginTop)).current;
	const iconAnimation = slideAnimation.interpolate({
		inputRange: [createSheetMarginTop, 0],
		outputRange: ['0deg', '45deg'],
	});

	useEffect(() => {
		Animated.spring(slideAnimation, {
			useNativeDriver: false,
			toValue: createSheetVisible ? 0 : createSheetMarginTop,
		}).start();
	}, [createSheetVisible]);

	const onFabPressed = useCallback(() => {
		setCreateSheetVisible(prevState => !prevState);
	}, []);

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.header}>
				<View style={styles.headerContainer}>
					<Text style={styles.screenTitle}>
						{createSheetVisible ? 'Yeni Görev Oluştur' : 'Görev Listesi'}
					</Text>
					<TextInput
						placeholder={'Bundan sonra neler yapmalısın?'}
						placeholderTextColor={'rgba(255,255,255,0.8)'}
						style={styles.textInput}
					/>
					<TouchableOpacity>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Oluştur</Text>
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<Animated.View style={[styles.contentContainer, { marginTop: slideAnimation }]}>
				<TouchableOpacity onPress={onFabPressed}>
					<View style={styles.fab}>
						<Animated.View style={[styles.fabIcon, { transform: [{ rotate: iconAnimation }] }]} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default TodoList;

const createSheetMarginTop = -162;
const purple = '#c4a9f6';
const purpleDark = '#B79EE7';
const blue = '#7ad9f5';
const borderRadius = Platform.OS === 'ios' ? 40 : 22;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: purple,
	},
	header: {
		height: 250,
		paddingTop: StatusBar.currentHeight,
	},
	headerContainer: {
		alignItems: 'center',
	},
	screenTitle: {
		marginTop: Platform.OS === 'ios' ? 5 : 22,
		fontSize: 16,
		fontWeight: Platform.OS === 'ios' ? '600' : '700',
		color: 'white',
	},
	textInput: {
		width: 280,
		height: 48,
		backgroundColor: purpleDark,
		marginTop: 22,
		borderRadius: 10,
		paddingHorizontal: 14,
	},
	button: {
		width: 280,
		height: 48,
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: Platform.OS === 'ios' ? '600' : '700',
		color: 'black',
	},
	contentContainer: {
		flex: 1,
		backgroundColor: 'white',
		borderTopStartRadius: borderRadius,
		borderTopEndRadius: borderRadius,
	},
	fab: {
		width: 62,
		height: 62,
		borderRadius: 31,
		backgroundColor: blue,
		alignSelf: 'flex-end',
		marginEnd: Platform.OS === 'ios' ? 38 : 20,
		marginTop: -31,
		justifyContent: 'center',
		alignItems: 'center',

		...Platform.select({
			ios: {
				shadowColor: blue,
				shadowOffset: {
					width: 0,
					height: 7,
				},
				shadowOpacity: 0.43,
				shadowRadius: 9.51,
			},
			android: {
				elevation: 12,
			},
		}),
	},
	fabIcon: {
		width: 18,
		height: 18,
		backgroundColor: 'white',
		borderRadius: 5,
	},
});
