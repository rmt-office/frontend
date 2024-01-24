const FormError = ({ message, className }: { message: string | undefined; className?: string }) => {
	return (
		<>
			<p className={`text-red-400 mx-0.5 text-xl ${className}`}>{`${message}`}</p>
		</>
	);
};
export default FormError;
