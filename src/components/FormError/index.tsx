const FormError = ({ message, className }: { message: string | undefined; className?: string }) => {
	return (
		<>
			<p className={`text-red-400 mx-0.5 ${className}`}>{`${message}`}</p>
		</>
	);
};
export default FormError;
