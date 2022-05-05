import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_PERSON = gql`
  mutation addPerson($name: String!, $surname: String!, $email: String!, $phone: String!) {
    addPerson(name: $name, surname: $surname, email: $email, phone: $phone) {
      _id
    }
  }
`;

const AddPerson: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");


  const [addPersonMutation] = useMutation(ADD_PERSON);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="PhoneNumber"
      />
       <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={() =>
          addPersonMutation({
            variables: {
              name,
              surname,
              email,
              phone
            },
          }).then(() => reloadHandler())
        }
      >
        Add
      </button>
    </div>
  );
};

export default AddPerson;
