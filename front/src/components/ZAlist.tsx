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

const ZAlist: FC = () => {
  const { loading, error, data } = useQuery<{ getPersons: Person[] }>(
    GET_PERSONS,
    {
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const sortedData = data?.getPersons.sort((a, b) => b.name.localeCompare(a.name));
  return (
    <div>
    {sortedData?.map((person) => (
        <div key={person._id}>
            <p>
                {person.name} {person.surname}
            </p>
            <p>{person.email}</p>
            <p>{person.phone}</p>
        </div>
    ))}
    </div>
  );
};

export default ZAlist;
