import React, {useState} from 'react'
import Modal from 'react-modal'
import './Header.css'
import logo from '../../assets/logo.svg'
import { Button, Tab, Tabs } from '@material-ui/core';
import Box from '@mui/material/Box';
// import TabPanel from '@mui/lab/TabPanel';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


// const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//     },
//   };

const Header = () => {
    //let subtitle
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [value, setValue] = useState('1')
    const [data, setData] = useState({
        formData:{
            username:'',
            password:''
        },
        submitted:false
    })

    const openModal = () => {
        setIsModalOpen(true)
    }
    // const afterOpenModal = () => {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // }
    const handleChange = (_, value) => {
        setValue(value)
    }

    const handleOnChange = e => {
        const {name, value} = e.target
        setData(prevData =>({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = () =>{
        setIsModalOpen(false)
        setData({submitted:true})
    }

    return (
        <div className='header'>
            <div className='logo rotate linear infinite'>
                <img src={logo} alt='logo'/>
            </div>
            <div className='action-control'>
                <Button className='show-book' 
                        variant='contained' 
                        color='primary'>
                        BOOK SHOW
                </Button>  
                <Button className='login-logout-btn' 
                        variant='contained' 
                        onClick={openModal}>
                        LOGIN
                </Button>

                <Modal isOpen={isModalOpen} className='auth-modal'>
                    <Box className='modal-container'>
                        <Box>
                            <Tabs className='custom-tab' value={value} indicatorColor='secondary' onChange={handleChange}>
                                <Tab label="LOGIN" value='1'/>
                                <Tab label="REGISTER" value='2'/>
                            </Tabs>
                        </Box>
                        {
                            value === '1'
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
                        <Box></Box>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Header;