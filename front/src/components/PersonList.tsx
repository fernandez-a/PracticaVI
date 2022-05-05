import React, { FC, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ZAlist from './ZAlist';
import AZlist from './AZlist';
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

const PersonsList: FC<{ reloadHandler: () => void }> = ({ reloadHandler }) => {
  const { loading, error, data } = useQuery<{ getPersons: Person[] }>(
    GET_PERSONS,
    {
      fetchPolicy: "network-only",
    }
  );
  const [sorted, setSort] = useState<boolean>(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <button onClick={() => setSort(true)}>A-Z</button>
      <button onClick={() => setSort(false)}>Z-A</button> 
      {sorted === true ? <AZlist></AZlist> : <ZAlist></ZAlist>}
    </div>
  );
};

export default PersonsList;
