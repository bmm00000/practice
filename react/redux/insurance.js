console.clear();

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

// Reducer
const claimsHistory = (oldListOfClaims = [], action) => {
	if (action.type === 'CREATE_CLAIM') {
		return [...oldListOfClaims, action.payload];
	}

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
