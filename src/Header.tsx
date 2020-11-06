import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles, { PRIMARY_COLOR } from './styles';

interface Props {
	sheetVisible: Boolean;
	createTask: (title: string) => void;
	isLoading: Boolean;
}

const Header = ({ sheetVisible, createTask, isLoading }: Props) => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (!isLoading) setTitle('');
	}, [sheetVisible]);

	return (
		<SafeAreaView style={styles.header}>
			<Text style={styles.screenTitle}>{sheetVisible ? 'Yeni Görev Oluştur' : 'Görev Listesi'}</Text>
			<View style={styles.headerContainer}>
				<TextInput
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder={'Bundan sonra neler yapmalısın?'}
					placeholderTextColor={'rgba(255,255,255,0.8)'}
				/>
				<TouchableOpacity onPress={() => createTask(title)}>
					<View style={styles.createButton}>
						{isLoading ?
							<ActivityIndicator color={PRIMARY_COLOR} />
							: <Text style={styles.createButtonText}>Oluştur</Text>
						}
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Header;
