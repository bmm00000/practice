import { Alert } from 'react-bootstrap';

const AlertComponent = ({ variant, message }) => {
	const alertMessage = message || 'Something went wrong';
	const alertVariant = variant || 'danger';

	return <Alert variant={alertVariant}>{alertMessage}</Alert>;
};

export default AlertComponent;
