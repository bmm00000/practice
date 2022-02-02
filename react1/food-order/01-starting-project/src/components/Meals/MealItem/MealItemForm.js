import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	return (
		<form className={classes.form}>
			<Input
				label='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
		</form>
	);
};

export default MealItemForm;

// Fixing Form Input IDs:
// With the current implementation of MealItemForm, every MealItem <Input /> receives the same id, as I do the following in the code I show in the previous lecture:

// <Input
//     label='Amount'
//     input={{
//         id: 'amount',
//         type: 'number',
//         min: '1',
//         max: '5',
//         step: '1',
//         defaultValue: '1',
//     }}
// />
// This works but it has two major disadvantages which are not immediately obvious (and hence unfortunately slipped through during the recordings):

// Clicking on ANY label will always select the same, first input element - even if that's not the one belonging to the actual MeatItem

// Screenreaders won't be able to connect labels + inputs correctly (since all labels point at the same input)

// Everything shown in the videos works as shown, and fixing this is optional, but since fixing this is easy, you might want to consider making the below adjustments:

// One possible workaround is to accept an id prop on the MealItemForm component and use that to create a unique id per <Input />:

// <Input
//     label='Amount'
//     input={{
//         id: 'amount_' + props.id, // this changed!
//         type: 'number',
//         min: '1',
//         max: '5',
//         step: '1',
//         defaultValue: '1',
//     }}
// />
// We just have to make sure that the id props is passed correctly to <MealItemForm /> when that component is being used (i.e. inside of the MealItem component):

// <MealItemForm id={props.id} />
// Last but not least, for that to work, we should also pass id as a prop to MealItem, hence inside of the AvailableMeals component, we should create <MealItem /> elements like this:

// <MealItem
//     id={meal.id} // this is new!
//     key={meal.id}
//     name={meal.name}
//     description={meal.description}
//     price={meal.price}
// />
// Again, this is all 100% optional when it comes to the general functionality of this demo app - everything works as shown in the videos without these changes as well. But for proper accessibility, you should consider making these adjustments.

// I did also update all the code snapshots to reflect these changes.
