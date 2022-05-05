import React, { FC, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Modal from "react-modal";

const EDIT_PERSON = gql`
  mutation editPerson(
    $email: String!
    $email2: String!
  ) {
    editPerson(email: $email, email2: $email2) {
      email
    }
  }
`;

const EditPerson: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [email2, setEmail_To_Edit] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [editPersonMutation] = useMutation(EDIT_PERSON);
    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Example Modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        width: "40%",
                        height: "70%",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                    },
                    content: {
                        padding: "0",
                    },
                }}
            >
                <button onClick={() => setModalIsOpen(false)}>X</button>
                <div>
                    <h1>Edit person</h1>
                    {/* <input
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
          /> */}
                    <input
                        type="text"
                        value={email2}
                        onChange={(e) => setEmail_To_Edit(e.target.value)}
                        placeholder="Email to edit"
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button
                        onClick={() =>
                            editPersonMutation({
                                variables: {
                                    email2,
                                    email,
                                },
                            }).then(() => reloadHandler())
                        }
                    >
                        Edit
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default EditPerson;
