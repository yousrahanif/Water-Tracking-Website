'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [authenticating, setAuthenticating] = useState(false)

    const { signup, login } = useAuth()

    const router = useRouter(); // Initialize useRouter
    const searchParams = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get('mode'); // Get the mode from query parameter
        setIsRegister(mode === 'signup'); // Set isRegister based on mode
    }, [searchParams]);





    // async function handleSubmit() {
    //     if (!email || !password || password.length < 6) {
           
           
    //         Swal.fire({  // SweetAlert for validation errors
    //             icon: 'error',
    //             title: 'Error',
    //             text: 'Please enter a valid email and password (at least 6 characters).',
    //         });
           
           
           
    //         return
    //     }
    //     setAuthenticating(true)
    //     try {
    //         if (isRegister) {
    //             await signup(email, password)
    //             Swal.fire({  // Success SweetAlert
    //                 icon: 'success',
    //                 title: 'Success',
    //                 text: 'Registration successful!',
    //             });
    //         } else {
    //             await login(email, password)
    //             await login(email, password);
    //             Swal.fire({ // Success SweetAlert
    //                 icon: 'success',
    //                 title: 'Success',
    //                 text: 'Login successful!',
    //             });
    //         }

    //     } catch (err) {
    //         console.log(err.message)
    //         Swal.fire({ // Error SweetAlert
    //             icon: 'error',
    //             title: 'Error',
    //             text: err.message || 'An error occurred. Please try again.', // Display error message or default
    //         });
    //     } finally {
    //         setAuthenticating(false)
    //     }
       
    // }



    async function handleSubmit() {
        if (!email || !password || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid email and password (at least 6 characters).',
            });
            return;
        }
    
        setAuthenticating(true);
        try {
            if (isRegister) {
                await signup(email, password);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Registration successful! Redirecting...',
                }).then(() => {
                    router.push('/dashboard'); // Use router.push for navigation
                });
            } else {
                await login(email, password);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login successful! Redirecting...',
                }).then(() => {
                    router.push('/dashboard'); // Use router.push for navigation
                });
            }
    
            // Redirect to dashboard after successful authentication
            window.location.href = '/dashboard';
    
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'An error occurred. Please try again.',
            });
        } finally {
            setAuthenticating(false);
        }
    }
    
    
    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <h3 className={'text-4xl sm:text-5xl md:text-6xl '}>{isRegister ? 'Register' : 'Log In'}</h3>
            <p>You&#39;re one step away!</p>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Email' />
            <input value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Password' type='password' />
            <div className='max-w-[400px] w-full mx-auto'>
                <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
            </div>
            <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}<button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'>{isRegister ? 'Sign in' : 'Sign up'}</button></p>
        </div>
    )
}