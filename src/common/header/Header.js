import React, {useState} from 'react'
import Modal from 'react-modal'
import './Header.css'
import logo from '../../assets/logo.svg'
import { Button, Tab, Tabs } from '@material-ui/core';
import Box from '@mui/material/Box';
// import TabPanel from '@mui/lab/TabPanel';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from "react-router-dom";


const Header = (props) => { 
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [indexVal, setIndexVal] = useState('1')
    const [data, setData] = useState({
        formData:{
            username:'',
            password:''
        },
        submitted:false
    })

    const [regData, setRegData] = useState({
        formData:{
            firstName:'',
            lastname:'',
            email:'',
            password:'',
            contact:''
        },
        submitted:false
    })
    const bookMovieShow =() => {
        console.log('Book Show Button clicked')
    }
    const openModal = () => {
        setIsModalOpen(true)
    }
    const handleChange = (_, value) => {
        setIndexVal(value)
    }

    const handleOnChange = e => {
        debugger;
        const {name, value} = e.target
        if(indexVal === '1'){
            setData(prevData =>({
                ...prevData,
                [name]: value
            }))
        }
        else{
            setRegData(prevData =>({
                ...prevData,
                [name]: value
            }))
        }
    }
    const handleSubmit = () =>{
        debugger;
        setIsModalOpen(false)
        setData({submitted:true})
    }
    //rotate linear infinite
    return (
        <div className='header'>
            <div className='logo rotate linear infinite'> 
                <img className='logoimg' src={logo} alt='logo'/>
            </div>
            <div className='action-control'>
            {
                props.isFrom !== 'Home' 
                ? 
                <Link to={`/bookshow/${props.currentMovieId}`}> 
                    <Button className='show-book' 
                            variant='contained' 
                            color='primary'
                            onClick={bookMovieShow}>
                            BOOK SHOW
                    </Button> 
                </Link>
                :
                <Box></Box>
            }
               
                <Button className='login-logout-btn' 
                        variant='contained' 
                        onClick={openModal}>
                        LOGIN
                </Button>

                <Modal isOpen={isModalOpen} className='auth-modal'>
                    <Box className='modal-container'>
                        <Box>
                            <Tabs className='custom-tab' value={indexVal} indicatorColor='secondary' onChange={handleChange}>
                                <Tab label="LOGIN" value='1'/>
                                <Tab label="REGISTER" value='2'/>
                            </Tabs>
                        </Box>
                        {
                            indexVal === '1'
                            ?
                            <Box>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <TextValidator
                                    id='username'
                                    label='username'
                                    type='text'
                                    name='username'
                                    className='textfiled-style'
                                    variant='standard'
                                    onChange={handleOnChange}
                                    value={data.username}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                >
                                </TextValidator>
                                <TextValidator
                                    id='password'
                                    label='password'
                                    type='password'
                                    name='password'
                                    className='textfiled-style'
                                    variant='standard'
                                    style={{marginTop:'25px'}}
                                    onChange={handleOnChange}
                                    value={data.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                >
                                </TextValidator>
                                <br/><br/>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    style={{marginTop:'20px', left:'40%'}}
                                    disabled={data.submitted}
                                >
                                  LOGIN
                                </Button>
                            </ValidatorForm>
                        </Box>
                        :
                        <Box>
                        <ValidatorForm onSubmit={handleSubmit}>
                                <TextValidator
                                    id='firstname'
                                    label='First Name'
                                    type='text'
                                    name='firstname'
                                    className='textfiled-style'
                                    variant='standard'
                                    onChange={handleOnChange}
                                    value={regData.firstName}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                >
                                </TextValidator>
                                <TextValidator
                                    id='lastname'
                                    label='Last Name'
                                    type='text'
                                    name='lastname'
                                    className='textfiled-style'
                                    variant='standard'
                                    style={{marginTop:'25px'}}
                                    onChange={handleOnChange}
                                    value={regData.lastname}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                >
                                </TextValidator>
                                <TextValidator
                                    id='email'
                                    label='Email'
                                    type='text'
                                    name='email'
                                    className='textfiled-style'
                                    variant='standard'
                                    style={{marginTop:'25px'}}
                                    onChange={handleOnChange}
                                    value={regData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                >
                                </TextValidator>
                                <TextValidator
                                    id='password'
                                    label='Password'
                                    type='password'
                                    name='password'
                                    className='textfiled-style'
                                    variant='standard'
                                    style={{marginTop:'25px'}}
                                    onChange={handleOnChange}
                                    value={regData.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                >
                                </TextValidator>
                                <TextValidator
                                    id='contact'
                                    label='Contact No'
                                    type='number'
                                    name='contact'
                                    className='textfiled-style'
                                    variant='standard'
                                    style={{marginTop:'25px'}}
                                    onChange={handleOnChange}
                                    value={regData.contact}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                >
                                </TextValidator>
                                <br/><br/>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    style={{marginTop:'20px', left:'40%'}}
                                    disabled={data.submitted}
                                >
                                  REGISTER
                                </Button>
                            </ValidatorForm>
                        </Box>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Header;