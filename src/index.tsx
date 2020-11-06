import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
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

	const [creating, setCreating] = useState(false);

	const createTask = useCallback((title: string) => {
		setCreating(true);
		axios({
			url: `${baseURL}/tasks`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				cfAccessKey: accessToken,
			},
			data: { title },
		}).then(res => {
			setTasks(prevState => [res.data, ...prevState]);
			setCreating(false);
			setSheetVisible(false);
		}).catch(e => {
			setCreating(false);
			console.warn(e);
		});
	}, [tasks]);

	const [isLoading, setLoading] = useState(false);

	const changeTaskStatus = useCallback((id: string, isCompleted: boolean) => {
		setLoading(true);
		axios({
			url: `${baseURL}/tasks/${id}`,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				cfAccessKey: accessToken,
			},
			data: { isCompleted },
		}).then(res => {
			const index = tasks.findIndex(task => task.id === res.data.id);
			const task = tasks[index];
			task.isCompleted = res.data.isCompleted;
			setTasks(prevState => [...prevState.slice(0, index), task, ...prevState.slice(index + 1)]);
			setLoading(false);
		}).catch(e => {
			console.warn(e);
			setLoading(false);
		});
	}, [tasks]);

	const editTask = useCallback(() => {

	}, []);

	const deleteTask = useCallback((id: string) => {
		Alert.alert('Bu Görevi Sil', 'Bu görevi silmek istediğinizden emin misiniz?', [
			{
				text: 'Sil',
				style: 'destructive',
				onPress: () => {
					setLoading(true);
					axios({
						url: `${baseURL}/tasks/${id}`,
						method: 'DELETE',
						headers: { 'Content-Type': 'appasdflication/json', cfAccessKey: accessToken },
					}).then(res => {
						const index = tasks.findIndex(t => t.id === id);
						setTasks(prevState => [
							...prevState.slice(0, index),
							...prevState.slice(index + 1),
						]);
						setLoading(false);
					}).catch(e => {
						console.warn(e);
						setLoading(false);
					});
				},
			},
			{
				text: 'İptal',
				style: 'cancel',
			},
		]);
	}, [tasks]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'light-content'} backgroundColor={'rgba(0,0,0,0.2)'} translucent={true} />
			<Header
				sheetVisible={sheetVisible}
				isLoading={creating}
				createTask={createTask}
			/>
			<Animated.View style={[styles.contentContainer, { marginTop: sheetAnimation }]}>
				<TouchableOpacity onPress={onFABPress}>
					<Animated.View style={[styles.fabButton, { transform: [{ rotate: fabButtonAnimation }] }]}>
						<View style={styles.fabButtonIcon} />
					</Animated.View>
				</TouchableOpacity>
				<FlatList
					data={tasks}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item }) => (
						<TaskItem
							key={item.id}
							id={item.id}
							title={item.title}
							isCompleted={item.isCompleted}
							onToggleStatusPress={() => changeTaskStatus(item.id, !item.isCompleted)}
							onEditStatusPress={() => editTask()}
							onDeleteStatusPress={() => deleteTask(item.id)}
						/>
					)}
				/>
			</Animated.View>
		</View>
	);
};

export default App;
