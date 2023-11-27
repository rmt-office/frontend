import { useState } from 'react'
import { userService, utilServices } from '../../utils/services'
import { useAuthValue } from '../../context'

function useProfile() {
	const { user, authenticateUser } = useAuthValue()
	const [isLoading, setIsLoading] = useState(false)
	const [userPicture, setUserPicture] = useState<{
		file: null | File
		picture: string
		isChanged: boolean
	}>({
		file: null,
		picture: user!.profilePicture,
		isChanged: false,
	})

	const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		const newPic = event.target.files[0]
		const picURL = URL.createObjectURL(newPic)
		setUserPicture({
			file: newPic,
			picture: picURL,
			isChanged: true,
		})
	}

	const savePicture = async () => {
		if (!userPicture.file) return
		const photoData = new FormData()
		photoData.append('image', userPicture.file)
		try {
			setIsLoading(true)
			const { data } = await utilServices.uploadPhoto(photoData)
			await userService.uploadPhoto({ profilePicture: data })
			await authenticateUser()

			setUserPicture({ ...userPicture, file: null, isChanged: false })
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { userPicture, handlePicture, savePicture, isLoading, user, authenticateUser }
}
export default useProfile
