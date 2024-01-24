import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';

type Status = {
	status: 'error' | 'success' | 'verified' | undefined;
	message: string;
	id?: string;
};

const Token = () => {
	const [searchParams] = useSearchParams();
	const [status, setStatus] = useState<Status>({
		status: undefined,
		message: '',
	});
	const navigate = useNavigate();

	const getVerification = useCallback(
		async (token: string) => {
			try {
				const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/${token}`);
				console.log(data);
				setStatus({
					status: 'verified',
					message: data.message,
				});
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			} catch (error) {
				if (error instanceof AxiosError) {
					// 'jwt expired'
					if (error.response?.data.message === 'jwt malformed') {
						console.log(error);
						setStatus({
							status: 'error',
							message: 'Token Expired',
							// id: error.response.data.details.id,
						});
					}
				}
			}
		},
		[navigate]
	);

	const resendToken = async () => {
		console.log(status.id);
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}/auth/newToken/${status.id}`
			);
			console.log(data);
			setStatus({
				status: 'success',
				message: data.message,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const token = searchParams.get('token');
		if (token) {
			getVerification(token);
		}
	}, [searchParams, getVerification]);

	return (
		<div>
			<PageTitle>Email verification</PageTitle>
			{!status.status && <p>Please wait while we verify your email</p>}
			{status.status === 'error' && (
				<Button onClick={resendToken}> Resent email verification</Button>
			)}
			{status.status === 'success' && <p>{status.message}</p>}

			{status.status === 'verified' && (
				<>
					<p>{status.message}</p>
					<p>You'll be redirected to the login page in 2s</p>
				</>
			)}
		</div>
	);
};

export default Token;
