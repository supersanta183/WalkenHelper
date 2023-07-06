"use client"
import React, { useEffect, useState } from 'react'

import { updateUser } from '@/components/FetchUser';
import UserDropdown from '@/components/UserDropdown';
import CatCard from './CatCard'
import AddCat from './AddCat';
import fetchUser from '@/components/FetchUser';


const CathleticsPage = () => {
    const [newCatName, setNewCatName] = useState(null)
    const [newCatLevel, setNewCatLevel] = useState(null)
    const [newCatRarity, setNewCatRarity] = useState(null)
    const [user, setUser] = useState('Emil')
    const [fetchedUser, setFetchedUser] = useState(null)

    //fetch user on mount
    useEffect(() => {
        let user = localStorage.getItem('user')
        if (user) {
            setUser(user)
        }
        fetchAndSetUser()
    }, [])

    useEffect(() => {
        fetchAndSetUser()
    }, [user])

    const fetchAndSetUser = async () => {
        if (!user) return
        setFetchedUser(await fetchUser(user))
    }

    if (!fetchedUser) return (
        <div className='flex items-center justify-center h-full'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )

    return (

        <div className='pl-0 pb-5 max-w-screen bg-transparent flex flex-col h-full'>

            <AddCat
                setNewCatName={setNewCatName}
                newCatName={newCatName}
                setNewCatLevel={setNewCatLevel}
                newCatLevel={newCatLevel}
                setNewCatRarity={setNewCatRarity}
                newCatRarity={newCatRarity}
                updateUser={updateUser}
                fetchedUser={fetchedUser}
            />


            <div className='navbar'>
                <div className='navbar-start'>
                    <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg flex text-center mt-4 bg-opacity-80" onClick={() => window.my_modal_5.showModal()}>Add cathletic
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                <div className='navbar-end'>
                    <UserDropdown
                        setUser={setUser}
                        user={user}
                    />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row h-full flex-wrap'>
                {fetchedUser.cats.map((cat) => (
                    <CatCard key={cat.id} cat={cat} updateUser={updateUser} user={fetchedUser} fetchUser={fetchAndSetUser} />
                ))}
            </div>

        </div>
    )
}

export default CathleticsPage