import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Header = () => {
	return (
		<SafeAreaView style={styles.header}>
			<Text style={styles.screenTitle}>Görev Listesi</Text>
			<View style={styles.headerContainer}>
				<TextInput
					style={styles.input}
					placeholder={'Bundan sonra neler yapmalısın?'}
					placeholderTextColor={'rgba(255,255,255,0.8)'}
				/>
				<TouchableOpacity>
					<View style={styles.createButton}>
						<Text style={styles.createButtonText}>Oluştur</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Header;
