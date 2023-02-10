const Backdrop = (props) => {
	const hideModalHandler = () => {
		props.onClick();
	};

	return <div className='backdrop' onClick={hideModalHandler} />;
};

export default Backdrop;
