import React from 'react';
import ReactDOM from 'react-dom';
import Cards from './Cards';
import Button from './Button';
import Faker from 'faker';

const App = () => {
	return (
		<div>
			<Cards name={Faker.name.firstName()} lastname={Faker.name.lastName()} image={Faker.image.avatar()}>
				<Button />
				<div>
					<h4>Are you sure?</h4>
				</div>
			</Cards>
			<Cards name={Faker.name.firstName()} lastname={Faker.name.lastName()} image={Faker.image.avatar()}>
				<Button />
			</Cards>
			<Cards name={Faker.name.firstName()} lastname={Faker.name.lastName()} image={Faker.image.avatar()}>
				<div>
					<h4>Are you sure?</h4>
				</div>
			</Cards>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
