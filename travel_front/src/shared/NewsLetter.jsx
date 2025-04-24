import React from 'react'
import './newsletter.css'

import { Container } from 'react-bootstrap'
import maleTourist from '../data/image/landingpage_icon3.png'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';

const NewsLetter = () => {
    return <section className='newsletter'>
        <Container>
            <div className='newsletter-row'>

                <div className='newsletter__content'>
                    <h2>Message Us</h2>

                    <div className='newsletter__input'>
                        <input type='email' placeholder='Enter Your Email' />
                        <textarea type='email' placeholder='Enter Your message' />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </Stack>
                    </div>
                </div>

                <div className='newsletter__img'>
                    <img src={maleTourist} width="400px" height="390px" alt='...' />
                </div>
            </div>
        </Container>
    </section>
}

export default NewsLetter