import React, { FC, useState } from "react";
import { gql, useQuery } from "@apollo/client";

type Person = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
};

const GET_PERSONS = gql`
  query getPersons {
    getPersons {
      _id
      name
      surname
      email
      phone
    }
  }
`;

const SortedList: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
  const { loading, error, data } = useQuery<{ getPersons: Person[] }>(
    GET_PERSONS,
    {
      fetchPolicy: "network-only",
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data?.getPersons.map((person) => (
        <div key={person._id}>
          <p>{person.name}</p>
          <p>{person.surname}</p>
          <p>{person.email}</p>
          <p>{person.phone}</p>
        </div>
      ))}
      <button onClick={() => reloadHandler()}>A-Z</button>
      <button onClick={() => reloadHandler()}>Z-A</button>
    </div>
  );
};

export default SortedList;
