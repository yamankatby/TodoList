import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
	id: String;
	title: String;
	isCompleted: Boolean;
}

const TaskItem = (props: Props) => {
	return (
		<View style={styles.taskContainer}>
			<View style={styles.taskTitleContainer}>
				<TouchableOpacity>
					<View style={styles.checkbox} />
				</TouchableOpacity>
				<Text style={styles.taskTitle}>{props.title}</Text>
			</View>
			<View style={styles.taskActionContainer}>
				<TouchableOpacity>
					<Text style={styles.editButton}>Düzenle</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.deleteButton}>Sil</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TaskItem;
