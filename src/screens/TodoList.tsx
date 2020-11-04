import React, { useEffect, useRef, useState } from 'react';
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

const createSheetMarginTop = -168;

const TodoList = () => {
	const slideAnimation = useRef(new Animated.Value(createSheetMarginTop)).current;
	const iconInterpolate = slideAnimation.interpolate({
		inputRange: [createSheetMarginTop, 0],
		outputRange: ['0deg', '45deg'],
	});

	const [isCreateSheetVisible, setIsCreateSheetVisible] = useState(false);

	useEffect(() => {
		Animated.spring(slideAnimation, {
			useNativeDriver: false,
			toValue: isCreateSheetVisible ? 0 : createSheetMarginTop,
		}).start();
	}, [isCreateSheetVisible]);

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.header}>
				<View style={styles.headerContainer}>
					<Text style={styles.screenTitle}>{isCreateSheetVisible ? 'Create New Todo' : 'Todo List'}</Text>
					<TextInput
						placeholder={'What you have todo'}
						style={styles.textInput}
					/>
					<TouchableOpacity>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Create</Text>
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<Animated.View style={[styles.contentContainer, { marginTop: slideAnimation }]}>
				<TouchableOpacity onPress={() => setIsCreateSheetVisible(prevState => !prevState)}>
					<View style={styles.fab}>
						<Animated.View style={[styles.fabIcon, { transform: [{ rotate: iconInterpolate }] }]} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default TodoList;

const purple = '#c4a9f6';
const purpleDark = '#B095E5';
const blue = '#7ad9f5';
const borderRadius = Platform.OS === 'ios' ? 40 : 22;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: purple,
	},
	header: {
		height: 260,
		paddingTop: StatusBar.currentHeight,
	},
	headerContainer: {
		alignItems: 'center',
	},
	screenTitle: {
		marginTop: Platform.OS === 'ios' ? 8 : 22,
		fontSize: 18,
		fontWeight: '700',
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
		fontWeight: '600',
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
