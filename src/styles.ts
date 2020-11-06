import { Platform, StatusBar, StyleSheet } from 'react-native';

export const PRIMARY_COLOR = '#c4a9f6';
export const PRIMARY_DARK_COLOR = '#B79EE7';
export const SECONDARY_COLOR = '#7ad9f5';
export const SEPARATOR_COLOR = '#EDEDED';
export const GRAY_COLOR = '#454545';
export const SHEET_MARGIN_TOP = -142;
export const SHEET_BORDER_RADIUS = Platform.OS === 'ios' ? 40 : 22;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
	},
	header: {
		height: Platform.OS === 'ios' ? 230 : 200,
		marginTop: StatusBar.currentHeight,
		alignItems: 'center',
	},
	headerContainer: {
		alignItems: 'flex-start',
	},
	screenTitle: {
		marginTop: Platform.OS === 'ios' ? 5 : 20,
		fontSize: 16,
		fontWeight: Platform.OS === 'ios' ? '600' : '700',
		color: 'white',
	},
	input: {
		width: 280,
		height: 48,
		marginTop: 22,
		paddingHorizontal: 16,
		backgroundColor: PRIMARY_DARK_COLOR,
		borderRadius: 8,
		color: 'white',
	},
	createButton: {
		width: 100,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 12,
		backgroundColor: 'white',
		borderRadius: 8,
	},
	createButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: PRIMARY_DARK_COLOR,
	},
	contentContainer: {
		flex: 1,
		backgroundColor: 'white',
		borderTopStartRadius: SHEET_BORDER_RADIUS,
		borderTopEndRadius: SHEET_BORDER_RADIUS,
	},
	fabButton: {
		width: 62,
		height: 62,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
		marginTop: -31,
		marginEnd: SHEET_BORDER_RADIUS,
		backgroundColor: SECONDARY_COLOR,
		borderRadius: 31,

		...Platform.select({
			ios: {
				shadowColor: SECONDARY_COLOR,
				shadowOffset: {
					width: 0,
					height: 7,
				},
				shadowOpacity: 0.41,
				shadowRadius: 9.11,
			},
			android: {
				elevation: 14,
			},
		}),
	},
	fabButtonIcon: {
		width: 18,
		height: 18,
		backgroundColor: 'white',
		borderRadius: 6,
	},
	taskContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 18,
		paddingVertical: 16,
	},
	taskTitleContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		width: 18,
		height: 18,
		borderRadius: 6,
		borderWidth: 1.8,
		borderColor: PRIMARY_COLOR,
	},
	taskTitle: {
		marginStart: 14,
	},
	taskActionContainer: {
		flexDirection: 'row',
	},
	editButton: {
		color: GRAY_COLOR,
	},
	deleteButton: {
		marginStart: 12,
		color: '#ff4545',
	},
	separator: {
		flex: 1,
		height: 1,
		marginStart: 50,
		backgroundColor: '#eee',
	},
	progress: {
		width: 62,
		height: 62,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		borderRadius: 31,
		backgroundColor: GRAY_COLOR,

		...Platform.select({
			ios: {
				shadowColor: GRAY_COLOR,
				shadowOffset: {
					width: 0,
					height: 7,
				},
				shadowOpacity: 0.41,
				shadowRadius: 9.11,
			},
			android: {
				elevation: 14,
			},
		}),
	},
});

export default styles;
