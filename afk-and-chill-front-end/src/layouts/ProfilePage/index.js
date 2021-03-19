import React, { useState, useEffect } from 'react';
import Profile from '../../components/Profile';
import { getUser } from '../../network';
import { updateUser } from '../../network';

export default function ProfilePage({ setisAuthenticated }) {
    const [user, setUser] = useState([]);
    const [games, setGames] = useState([]);
    //const [updateUser, setUpdateUser] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getUser();
                setUser(response.user);
                setGames(response.user.games);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Profile
            user={user}
            games={games}
            updateUser={updateUser}
            setisAuthenticated={setisAuthenticated}
        />
    );
}
