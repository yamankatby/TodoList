import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './screens/TodoList';
import CreateTodo from './screens/CreateTodo';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<StatusBar backgroundColor={'rgba(0,0,0,0.2)'} translucent />
			<Stack.Navigator mode={'modal'} screenOptions={{ header: () => null }}>
				<Stack.Screen name="TodoList" component={TodoList} />
				<Stack.Screen name="CreateTodo" component={CreateTodo} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;

// import React, { useEffect, useState } from 'react';
// import { FlatList, SafeAreaView, Text, View } from 'react-native';
// import axios from 'axios';
//
// const baseURL = 'https://todo.crudful.com';
// const accessToken = '51571bb27d78483638f504926f759644da74ab11';
//
// interface Task {
// 	id: string;
// 	title: string;
// 	due: Date;
// 	isCompleted: boolean;
// }
//
// const App = () => {
// 	const [tasks, setTasks] = useState<Task[]>([]);
//
// 	useEffect(() => {
// 		axios({
// 			url: `${baseURL}/tasks`,
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				cfAccessKey: accessToken,
// 			},
// 		}).then(res => {
// 			setTasks(res.data.results);
// 		}).catch(e => {
// 			console.warn(e);
// 		});
// 	}, []);
//
// 	return (
// 		<View style={{ flex: 1, backgroundColor: 'red' }}>
// 			<SafeAreaView style={{ backgroundColor: 'green', flex: 1 }}>
// 				<View style={{ flex: 1, backgroundColor: 'yellow' }}>
// 					<FlatList
// 						data={tasks}
// 						renderItem={({ item }) => (
// 							<View>
// 								<Text>{item.title}</Text>
// 								<Text>{item.due}</Text>
// 							</View>
// 						)}
// 					/>
// 				</View>
// 			</SafeAreaView>
// 		</View>
// 	);
// };
//
// export default App;
