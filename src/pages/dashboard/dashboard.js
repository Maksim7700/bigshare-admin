import React,{useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import {fetchUserData, logout} from '../../api/authenticationService';


const MainWrapper=styled.div`
    padding-top:40px;
`;

export const Dashboard=(props)=>{

    const [data,setData]=useState({});

    React.useEffect(()=>{

        fetchUserData().then((response)=>{
            setData(response.data);
            console.log(response.data.authorities);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/');
        })
    },[])

    const logOut=()=>{
        logout().then(() => {
            localStorage.clear();
            props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <Container>
            <MainWrapper>
                <h4>Hello {data && `${data.firstName} ${data.lastName}`}</h4>
                <br></br>
                {data && data.roles && data.authorities.filter(value => value.authority==='ROLE_ADMIN').length>0 && <Button type="variant">Add User</Button> }
                <br></br>

                <Button style={{marginTop:'5px'}} onClick={() =>logOut()}>Logout</Button>
            </MainWrapper>
        </Container>
    )
}