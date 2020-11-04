import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreateTodo = () => {
	const navigation = useNavigation();
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>CreateTodo Screen!</Text>
			<Button title={'Create new'} onPress={() => {
				navigation.navigate('TodoList');
			}} />
		</View>
	);
};

export default CreateTodo;
