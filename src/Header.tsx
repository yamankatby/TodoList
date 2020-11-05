import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles, { PRIMARY_COLOR } from './styles';

interface Props {
	sheetVisible: Boolean;
	isLoading: Boolean;
}

const Header = (props: Props) => {
	return (
		<SafeAreaView style={styles.header}>
			<Text style={styles.screenTitle}>{props.sheetVisible ? 'Yeni Görev Oluştur' : 'Görev Listesi'}</Text>
			<View style={styles.headerContainer}>
				<TextInput
					style={styles.input}
					placeholder={'Bundan sonra neler yapmalısın?'}
					placeholderTextColor={'rgba(255,255,255,0.8)'}
				/>
				<TouchableOpacity>
					<View style={styles.createButton}>
						{props.isLoading ?
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
