import { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Modal from "react-modal";
import styled from '@emotion/styled'
import { StyledModal, Styled_Button_2 } from '../styles';


const Detail: FC<{visible:boolean, setVisible:(condition:boolean) => void}> = ({ visible, setVisible}) => {

    return (
        <Modal isOpen={visible} onRequestClose={() => setVisible(false)} portalClassName="modal" style={{
            overlay: {
                width: '40%',
                height: '70%',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                backgroundColor: "##98DDFF"
            },
            content: {
                padding: '0',
            }
        }}>
            <Styled_Button_2 onClick={() => setVisible(false)}>X</Styled_Button_2>
            <StyledModal>
                
            </StyledModal>
        </Modal>
    )
}


export default Detail