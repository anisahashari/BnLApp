import react from 'react';
import {safeareaview} from 'react-native';
import {Test,header,view,button} from '@components';
import {styles} from './styles';
import {usetheme} from '@config/theme.config';

export default function CartScreen({navigation}) {
	const {colors} = useTheme();
	return (
	<SafeAreaView style={styles.container}>
		<Header title={'Item Cart'} />
		<ScrollView contentContainerStyle={styles.content}>
			<CartCard title={'White Dress'} subtitle={'Women'} amount={'10'} />
			<CartCard title={'Red Dress'} subtitle={'Women'} amount={'10'} />
			<View style={styles.totalSection}>
				<Text title1>Totals</Text>
				<View row aCenter space={'between'}>
					<Text caption size={16} color={colors.black}>
						Sub Total
					</Text>
					<View style={styles.divider} />
					<Text title1 size={18} color={colors.black}>
						30.00
					</Text>
				</View>
				<View style={styles.sectionPrice} row aCenter space={'between'}>
					<Text caption size={16} color={colors.black}>
						Shipping
					</Text>
					<View style={styles.divider} />
					<Text title1 size={18} color={colors.black}>
						$0
					</Text>
				</View>
				<Button tittle={'Checkout'} style={styles.button}/>
        </View>
		</ScrollView>
	</SafeAreaView>
);
}
