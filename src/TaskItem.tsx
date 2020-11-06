import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles, { PRIMARY_COLOR } from './styles';

interface Props {
	id: String;
	title: String;
	isCompleted: Boolean;
	onToggleStatusPress: () => void;
	onEditStatusPress: () => void;
	onDeleteStatusPress: () => void;
}

const TaskItem = ({ id, title, isCompleted, onToggleStatusPress, onEditStatusPress, onDeleteStatusPress }: Props) => {
	return (
		<View style={styles.taskContainer}>
			<View style={styles.taskTitleContainer}>
				<TouchableOpacity onPress={onToggleStatusPress}>
					<View style={[styles.checkbox, { backgroundColor: isCompleted ? PRIMARY_COLOR : undefined }]} />
				</TouchableOpacity>
				<Text style={styles.taskTitle}>{title}</Text>
			</View>
			<View style={styles.taskActionContainer}>
				<TouchableOpacity>
					<Text style={styles.editButton} onPress={onEditStatusPress}>Düzenle</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.deleteButton} onPress={onDeleteStatusPress}>Sil</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TaskItem;
