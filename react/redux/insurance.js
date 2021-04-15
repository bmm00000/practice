console.clear();
// we do this in order to clear any previous code in the console of the browser when we run our code in codepen. we do this using codepen, so we can access the redux library.

// Action creator
const createPolicy = (name, amount) => {
	return {
		// Action
		type: 'CREATE_POLICY',
		payload: {
			name: name,
			amount: amount,
		},
	};
};

const deletePolicy = (name) => {
	return {
		type: 'DELETE_POLICY',
		payload: {
			name: name,
		},
	};
};

const createClaim = (name, amount) => {
	return {
		type: 'CREATE_CLAIM',
		payload: {
			name: name,
			amount: amount,
		},
	};
};

// 'dispatch' (the admin person/receiver of the form) is part of the Redux library itself, so we don't have to write it from scratch

// Reducers
const claimsHistory = (oldListOfClaims = [], action) => {
	if (action.type === 'CREATE_CLAIM') {
		// we care about this action (form)
		return [...oldListOfClaims, action.payload];
		// oldListOfClaims.push(action.payload) DON'T DO THIS!
		// watch out! every time we change something inside of a reducer, we ALWAYS want to return a new array, not to modify the array that we have. we always avoid modifying existing data structures inside of a reducer.
	}

	// we don't care about this action (form)
	return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
	if (action.type === 'CREATE_CLAIM') {
		return bagOfMoney - action.payload.amount;
	} else if (action.type === 'CREATE_POLICY') {
		return bagOfMoney + action.payload.amount;
	}
	return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
	if (action.type === 'CREATE_POLICY') {
		return [...listOfPolicies, action.payload.name];
	} else if (action.type === 'DELETE_POLICY') {
		return listOfPolicies.filter((name) => name !== action.payload.name);
	}

	return listOfPolicies;
};

// a 'store' in Redux is an object, the assembly of a collection of reducers and action creators.

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
	accounting: accounting,
	policies: policies,
	claimsHistory: claimsHistory,
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Brad', 250));
store.dispatch(createPolicy('Pet', 30));

store.dispatch(createClaim('Pet', 10));

store.dispatch(deletePolicy('Alex'));

console.log(store.getState());
// this will show the whole respository of data of our company

// you can only modify the state by 'dispatch' an 'action' that has been return by an 'action creator' (you cannot say 'store.state.policies... = ...')
