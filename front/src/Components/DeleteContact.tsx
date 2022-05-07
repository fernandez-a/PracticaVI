import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {Person} from "../types"
import styled from '@emotion/styled'
import { Styled_Button, Styled_div_3 } from "../styles";


const DELETE_PERSON = gql`
  mutation deletePerson($email: String!) {
    addPerson(email: $email)
  }
`;

const DeleteContact: FC<{ detail:Person, setVisible:(condition:boolean)=>void}> = ({detail,setVisible}) => {

    const [addDeleteMutation] = useMutation(DELETE_PERSON);

    return (
        <Styled_div_3>
                <Styled_Button
                    onClick={() => {
                        addDeleteMutation({
                            variables: {
                                email: detail.email,
                            },
                        }).then(() => {
                            setVisible(false)
                        })
                    }
                    }
                >
                    <h2>Delete</h2>
                </Styled_Button>
        </Styled_div_3>
    );

};

export default DeleteContact;
