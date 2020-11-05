import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Animated,
	FlatList,
	Platform,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import axios from 'axios';

import styles, { SECONDARY_COLOR, SEPARATOR_COLOR, SHEET_MARGIN_TOP } from '../styles';

const baseURL = 'https://todo.crudful.com';
const accessToken = '51571bb27d78483638f504926f759644da74ab11';

interface Task {
	id: string;
	title: string;
	isCompleted: boolean;
}

const TodoList = () => {
	const [createSheetVisible, setCreateSheetVisible] = useState(false);

	const slideAnimation = useRef(new Animated.Value(SHEET_MARGIN_TOP)).current;
	const iconAnimation = slideAnimation.interpolate({
		inputRange: [SHEET_MARGIN_TOP, 0],
		outputRange: ['0deg', '45deg'],
	});

	useEffect(() => {
		Animated.spring(slideAnimation, {
			useNativeDriver: false,
			toValue: createSheetVisible ? 0 : SHEET_MARGIN_TOP,
		}).start();
	}, [createSheetVisible]);

	const onFabPressed = useCallback(() => {
		setCreateSheetVisible(prevState => !prevState);
	}, []);

	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		axios({
			url: `${baseURL}/tasks`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				cfAccessKey: accessToken,
			},
		}).then(res => {
			setTasks(res.data.results);
		}).catch(e => {
			console.warn(e);
		});
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={'rgba(0,0,0,0.2)'} translucent barStyle={'light-content'} />
			<SafeAreaView style={styles.header}>
				<View>
					<Text style={styles.screenTitle}>
						{createSheetVisible ? 'Yeni Görev Oluştur' : 'Görev Listesi'}
					</Text>
					<TextInput
						placeholder={'Bundan sonra neler yapmalısın?'}
						placeholderTextColor={'rgba(255,255,255,0.8)'}
						style={styles.input}
					/>
					<TouchableOpacity>
						<View style={styles.createButton}>
							<Text style={styles.createButton}>Oluştur</Text>
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<Animated.View style={[styles.contentContainer, { marginTop: slideAnimation }]}>
				<TouchableWithoutFeedback onPress={onFabPressed}>
					<View style={styles.fabButton}>
						<Animated.View style={[styles.fabButtonIcon, { transform: [{ rotate: iconAnimation }] }]} />
					</View>
				</TouchableWithoutFeedback>
				<View style={{ flex: 1, marginTop: 12 }}>
					<FlatList
						style={{ paddingStart: 26 }}
						data={tasks}
						renderItem={({ item }) => (
							<View style={{}}>
								<View style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginVertical: 14,
								}}
								>
									<TouchableOpacity>
										<View style={{
											width: 20,
											height: 20,
											borderRadius: 6,
											borderWidth: 1.8,
											borderColor: SECONDARY_COLOR,
										}} />
									</TouchableOpacity>
									<Text style={{
										marginStart: 10, fontSize: 16,
										fontWeight: Platform.OS === 'ios' ? '400' : '500',
									}}>{item.title}</Text>
								</View>
								<View style={{
									flex: 1,
									height: 1,
									backgroundColor: SEPARATOR_COLOR,
									marginStart: 30,
								}} />
							</View>
						)}
					/>
				</View>
			</Animated.View>
		</View>
	);
};

export default TodoList;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: PRIMARY_COLOR,
// 	},
// 	header: {
// 		height: 250,
// 		paddingTop: StatusBar.currentHeight,
// 	},
// 	headerContainer: {
// 		alignItems: 'center',
// 	},
// 	screenTitle: {
// 		marginTop: Platform.OS === 'ios' ? 5 : 22,
// 		fontSize: 16,
// 		fontWeight: Platform.OS === 'ios' ? '600' : '700',
// 		color: 'white',
// 	},
// 	textInput: {
// 		width: 280,
// 		height: 48,
// 		backgroundColor: PRIMARY_DARK_COLOR,
// 		marginTop: 22,
// 		borderRadius: 10,
// 		paddingHorizontal: 14,
// 	},
// 	button: {
// 		width: 280,
// 		height: 48,
// 		backgroundColor: 'white',
// 		borderRadius: 10,
// 		marginTop: 12,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	buttonText: {
// 		fontSize: 16,
// 		fontWeight: Platform.OS === 'ios' ? '600' : '700',
// 		color: 'black',
// 	},
// 	contentContainer: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 		borderTopStartRadius: SHEET_BORDER_RADIUS,
// 		borderTopEndRadius: SHEET_BORDER_RADIUS,
// 	},
// 	fab: {
// 		width: 62,
// 		height: 62,
// 		borderRadius: 31,
// 		backgroundColor: SECONDARY_COLOR,
// 		alignSelf: 'flex-end',
// 		marginEnd: Platform.OS === 'ios' ? 38 : 20,
// 		marginTop: -31,
// 		justifyContent: 'center',
// 		alignItems: 'center',
//
// 		...Platform.select({
// 			ios: {
// 				shadowColor: SECONDARY_COLOR,
// 				shadowOffset: {
// 					width: 0,
// 					height: 7,
// 				},
// 				shadowOpacity: 0.43,
// 				shadowRadius: 9.51,
// 			},
// 			android: {
// 				elevation: 12,
// 			},
// 		}),
// 	},
// 	fabIcon: {
// 		width: 18,
// 		height: 18,
// 		backgroundColor: 'white',
// 		borderRadius: 5,
// 	},
// });
