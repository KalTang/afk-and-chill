import axios from 'axios';
import { userToken } from './userAuth';

// Setup user token
const getToken = async () => {
    try {
        const token = await userToken();

        if (token) {
            return token;
        }
    } catch (error) {
        throw error;
    }
};

// Config axios
const api = axios.create({
    baseURL: 'https://4yvcbwlong.execute-api.us-east-2.amazonaws.com/prod',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Register a new user
export async function registerUser({
    userId,
    name,
    about,
    gender,
    genderPref,
    photoUrl,
    games,
}) {
    try {
        const response = await api.post('/user/register', {
            userId,
            name,
            about,
            gender,
            genderPref,
            photoUrl,
            games,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get matchable chillers
export async function getMatchableChillers() {
    try {
        const token = await getToken();

        const response = await api.get('/chillers', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data.chillers;
        }
    } catch (error) {
        throw error;
    }
}

// Dislike a chiller
export async function dislike(userTwoId) {
    try {
        const token = await getToken();

        const response = await api.patch(
            '/dislike',
            { userTwoId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response) {
            const data = await JSON.parse(response.data?.body);

            return data.successMsg;
        }
    } catch (error) {
        throw error;
    }
}

// Like a chiller
export async function like(userTwoId) {
    try {
        const token = await getToken();

        const response = await api.patch(
            '/like',
            { userTwoId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response) {
            const data = await JSON.parse(response.data?.body);

            return data.successMsg;
        }
    } catch (error) {
        throw error;
    }
}

// Save user photo to S3 bucket
export async function savePhotoFile(file) {
    try {
        // Get secure token from lambda
        const signedURLResult = await api.get('/user/uploadphoto');
        const { uploadURL } = signedURLResult.data;

        // Upload to s3
        await axios.put(uploadURL, file);
        const imageUrl = uploadURL.split('?')[0];

        return imageUrl;
    } catch (error) {
        throw error;
    }
}

// get chat box
export async function getChatBoxes() {
    try {
        const token = await getToken();
        const response = await api.get('/chatboxes', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);
            return data;
        }
    } catch (error) {
        throw error;
    }
}

//Update User information
export async function updateUser({
    name,
    genderPref,
    gender,
    about,
    photoUrl,
    games,
}) {
    try {
        const token = await getToken();
        const response = await api.patch(
            '/user',
            {
                userName: name,
                genderPref,
                gender,
                about,
                photoUrl,
                games,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);
            return data.successMsg;
        }
    } catch (error) {
        throw error;
    }
}

// create msg
export const sendMsg = async ({ message, chatboxId }) => {
    try {
        const token = await getToken();
        const response = await api.post(
            `/chatbox/message`,
            { message },
            {
                params: {
                    chatboxId,
                },

                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
};

//get messages
export async function getMsges({ chatboxId }) {
    try {
        const token = await getToken();
        const response = await api.get(`/chatbox/messages`, {
            params: {
                chatboxId: chatboxId,
            },
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
}

//GET INDIVIDUAL USER
export async function getUser() {
    try {
        const token = await getToken();
        const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response) {
            const data = await JSON.parse(response.data?.body);
            return data;
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
