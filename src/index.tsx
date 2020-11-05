import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Header from './Header';
import styles, { SHEET_MARGIN_TOP } from './styles';
import TaskItem from './TaskItem';

const baseURL = 'https://todo.crudful.com';
const accessToken = '51571bb27d78483638f504926f759644da74ab11';

interface Task {
	id: string;
	title: string;
	isCompleted: boolean;
}

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
			<StatusBar barStyle={'light-content'} backgroundColor={'rgba(0,0,0,0.2)'} translucent={true} />
			<Header
				sheetVisible={sheetVisible}
			/>
			<Animated.View style={[styles.contentContainer, { marginTop: sheetAnimation }]}>
				<TouchableOpacity onPress={onFABPress}>
					<Animated.View style={[styles.fabButton, { transform: [{ rotate: fabButtonAnimation }] }]}>
						<View style={styles.fabButtonIcon} />
					</Animated.View>
				</TouchableOpacity>
				<FlatList
					data={tasks}
					ItemSeparatorComponent={() => <View style={styles.separator}/>}
					renderItem={({ item }) => (
						<TaskItem
							key={item.id}
							id={item.id}
							title={item.title}
							isCompleted={item.isCompleted}
						/>
					)}
				/>
			</Animated.View>
		</View>
	);
};

export default App;
