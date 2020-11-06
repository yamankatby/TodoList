import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Animated,
	FlatList,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import axios from 'axios';
import styles, { PRIMARY_COLOR, PRIMARY_DARK_COLOR, SHEET_MARGIN_TOP } from './styles';

const baseURL = 'https://todo.crudful.com';
const cfAccessKey = '51571bb27d78483638f504926f759644da74ab11';

const Home = () => {
	const [isSheetVisible, setIsSheetVisible] = useState(false);
	const sheetAnimation = useRef(new Animated.Value(SHEET_MARGIN_TOP)).current;
	const fabButtonAnimation = sheetAnimation.interpolate({
		inputRange: [SHEET_MARGIN_TOP, 0],
		outputRange: ['0deg', '45deg'],
	});

	useEffect(() => {
		Animated.spring(sheetAnimation, {
			toValue: isSheetVisible ? 0 : SHEET_MARGIN_TOP,
			useNativeDriver: false,
		}).start();
	}, [isSheetVisible]);

	const onFABTouched = useCallback(() => {
		setIsSheetVisible(prevState => !prevState);
	}, []);

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		axios({
			url: `${baseURL}/tasks`,
			method: 'GET',
			headers: { 'Content-Type': 'application/json', cfAccessKey },
		}).then(response => {
			const tasks = response.data.results;
			setTasks(tasks);
			setIsLoading(false);
		}).catch(e => {
			console.warn(e);
			setIsLoading(false);
		});
	}, []);

	const [title, setTitle] = useState('');
	const [isCreating, setIsCreating] = useState(false);

	const onCreateTouched = useCallback(() => {
		setIsCreating(true);
		axios({
			url: `${baseURL}/tasks`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json', cfAccessKey },
			data: { title },
		}).then(response => {
			const task = response.data;
			setIsSheetVisible(false);
			setTasks(prevState => [task, ...prevState]);
			setTitle('');
			setIsCreating(false);
		}).catch(e => {
			console.warn(e);
			setIsCreating(false);
		});
	}, [title]);

	const [isLoading, setIsLoading] = useState(false);
	const progressAnimation = useRef(new Animated.Value(-62)).current;

	useEffect(() => {
		Animated.spring(progressAnimation, {
			toValue: isLoading ? 40 : -62,
			useNativeDriver: false,
		}).start();
	}, [isLoading]);

	const onChangeStatusTouched = useCallback((id: string, isCompleted: boolean) => {
		setIsLoading(true);
		axios({
			url: `${baseURL}/tasks/${id}`,
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', cfAccessKey },
			data: { isCompleted },
		}).then(response => {
			const index = tasks.findIndex(t => t.id === id);
			const task = response.data;
			setTasks(prevState => [
				...prevState.slice(0, index),
				task,
				...prevState.slice(index + 1),
			]);
			setIsLoading(false);
		}).catch(e => {
			console.warn(e);
			setIsLoading(false);
		});
	}, [tasks]);

	const onEditStatusTouched = useCallback(() => {

	}, [title]);

	const onDeleteTouched = useCallback((id: string) => {
		Alert.alert('Bu Görevi Sil', 'Bu görevi silmek istediğinizden emin misiniz?', [
			{
				text: 'Sil',
				style: 'destructive',
				onPress: () => {
					setIsLoading(true);
					axios({
						url: `${baseURL}/tasks/${id}`,
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json', cfAccessKey },
					}).then(() => {
						const index = tasks.findIndex(t => t.id === id);
						setTasks(prevState => [
							...prevState.slice(0, index),
							...prevState.slice(index + 1),
						]);
						setIsLoading(false);
					}).catch(e => {
						console.warn(e);
						setIsLoading(false);
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
			<StatusBar barStyle={'light-content'} backgroundColor={PRIMARY_DARK_COLOR} />
			<SafeAreaView style={styles.header}>
				<Text style={styles.screenTitle}>{isSheetVisible ? 'Yeni Görev Oluştur' : 'Görev Listesi'}</Text>
				<View style={styles.headerContainer}>
					<TextInput
						style={styles.input}
						placeholder={'Bundan sonra neler yapmalısın?'}
						placeholderTextColor={'rgba(255,255,255,0.8)'}
						value={title}
						onChangeText={text => setTitle(text)}
					/>
					<TouchableOpacity onPress={onCreateTouched}>
						<View style={styles.createButton}>
							{isCreating ? (
								<ActivityIndicator color={PRIMARY_COLOR} />
							) : (
								<Text style={styles.createButtonText}>Oluştur</Text>
							)}
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			<Animated.View style={[styles.contentContainer, { marginTop: sheetAnimation }]}>
				<TouchableOpacity onPress={onFABTouched}>
					<View style={styles.fabButton}>
						<Animated.View style={[styles.fabButtonIcon, { transform: [{ rotate: fabButtonAnimation }] }]} />
					</View>
				</TouchableOpacity>

				<FlatList
					data={tasks}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item }) => (
						<View key={item.id} style={styles.taskContainer}>
							<View style={styles.taskTitleContainer}>
								<TouchableOpacity onPress={() => onChangeStatusTouched(item.id, !item.isCompleted)}>
									<View style={[styles.checkbox, { backgroundColor: item.isCompleted ? PRIMARY_COLOR : undefined }]} />
								</TouchableOpacity>
								<Text style={styles.taskTitle}>{item.title}</Text>
							</View>
							<View style={styles.taskActionContainer}>
								<TouchableOpacity>
									<Text style={styles.editButton}>Düzenle</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => onDeleteTouched(item.id)}>
									<Text style={styles.deleteButton}>Sil</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				/>
			</Animated.View>

			<Animated.View style={[styles.progress, { bottom: progressAnimation }]}>
				<ActivityIndicator color={'white'} />
			</Animated.View>
		</View>
	);
};

export default Home;
