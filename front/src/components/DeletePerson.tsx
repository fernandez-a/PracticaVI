import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const DELETE_PERSON = gql`
  mutation deletePerson($email:String){
    deletePerson(email: $email) {
        email
    }
  }
`;


const DeletePerson: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
  const [email, setEmail] = useState<string>("");


  const [deletePersonMutation] = useMutation(DELETE_PERSON);
  return (
    <div>
       <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={() =>
            deletePersonMutation({
            variables: {
              email
            },
          }).then(() => reloadHandler())
        }
      >
        Delete
      </button>
    </div>
  );
};

export default DeletePerson;
