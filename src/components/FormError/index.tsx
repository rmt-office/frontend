const FormError = ({ message }: { message: string | undefined }) => {
	return (
		<>
			<p className='text-red-400 mx-0.5'>{`${message}`}</p>
		</>
	);
};
export default FormError;
