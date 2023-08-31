//import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import IUser from '../../../models/interfaces/user'
//import { Form, FormControl, FormGroup, FormLabel, FormSelect  } from 'react-bootstrap'
//import Modal from 'react-bootstrap/Modal'
//import Button from 'react-bootstrap/Button'
//import { useAppToastContext } from '../../../app/contexts/appToastContextProvider'

function CreateUserForm(props:any) {

    // destructure props
    const { show, onHide, modalTitle, actionFn, actionBtn, cancelFn, cancelBtn } = props

    // component output
    let content:any = ''

    const [isOpen, setIsOpen] = useState(true);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    // use the app toast context
    //const { makeToast } = useAppToastContext()

    // get query client (react-query)
    const queryClient = useQueryClient()

    // CREATE USER mutation (react-query)
    const createUserMutation = useMutation(async (user:IUser) => await axios.post('http://localhost:3500/users', user),        
    {
        onSuccess: (res) => {            
            //console.log("Success: ", {res})
            //cl('info', "CREATE USER Successful!")
            //cancelModal()
            //makeToast(res.data.message, 'primary')
        },       
        onError: (res) => {        
            //console.log("Error: ", {res})
            //cl('error', "CREATE USER FAILED!")
            //makeToast(res.response.data.message, 'danger')
        },
        onSettled: () => {
            //console.log("Settled: ", {res})
            queryClient.invalidateQueries('get-all-users')            
            cancelModal()  
        }
    })   

    // CREATE USER FORM (react-hook-form)
    const form = useForm({mode: "onChange"})

    // CUSTOM FUNCTIONS
    // submit form
    const submitCreateUserForm = ({ username, password, roles }:any) => {
        
        const newUser = {
            username: username,
            password: password,
            //firstname: firstname,
            //lastname: lastname,
            //email: email,
            roles: roles,
            //rolesArray: rolesArray,        
        }        
        createUserMutation.mutate({username, password, roles})
    }

    // cancel Modal
    const cancelModal = () => {
        //makeToast('Cancel World!', 'primary')
        form.reset()
        onHide()
    }

    ////// BEGIN COMPONENT OUTPUT //////    
    content = <> 
        {/* <Modal  isOpen={isOpen} onClose={closeModal}> */}
            <form className="green-form" onSubmit={form.handleSubmit(submitCreateUserForm)}>
                
                <label className="green-form-label" htmlFor="username"> 
                    Username: <span className="nowrap">[3-20 chars]</span>
                </label>          

                <input className="green-form-input" {...form.register("username", { pattern: /^[A-z][A-z0-9]{2,19}$/, required: true, minLength: 3, maxLength: 20 })} aria-invalid={form.formState.errors?.username ? "true" : "false"} id="username" name="username" type="text" autoComplete="off"/>
                {form.formState.errors?.username?.type === 'pattern' && <p className="text-red-700 text-xl" role="alert">Username can be up to 20 characters, and must start with a letter.</p>}
                {form.formState.errors?.username?.type === 'required' && <p className="text-red-700 text-xl" role="alert">Username is required</p>}
                {form.formState.errors?.username?.type === 'minLength' && <p className="text-red-700 text-xl" role="alert">Username must be at least 3 characters.</p>}
                {form.formState.errors?.username?.type === 'maxLength' && <p className="text-red-700 text-xl" role="alert">Username must be less than 20 characters.</p>}
                    
                <label className="green-form-label" htmlFor="password"> 
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                </label> 

                <input className="green-form-input" {...form.register("password", { required: true, minLength: 4, maxLength: 12 })} id="password" name="password" type="password"/>

                <label className="green-form-label" htmlFor="roles"> 
                    Roles:
                </label>

                <select className="green-form-input" {...form.register("roles", { required: true })} id="roles" name="roles" multiple={true}>                                             
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                     <option value="Admin">Admin</option>
                </select>
            </form>    
        {/* </Modal>  */}
    </>    
    return content
}

export default CreateUserForm
