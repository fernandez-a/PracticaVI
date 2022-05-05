import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import PersonsList from './components/PersonList';
import AddPerson from './components/AddPerson';
import DeletePerson from './components/DeletePerson';
import EditPerson from './components/EditPerson';

function App() {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
  });

  const [reload,setReload] = useState<boolean>(true);
  const reloadHandler = () => {
    setReload(!reload)
  }
  return (
    <ApolloProvider client={client}>
      <PersonsList key={String(reload)} reloadHandler={reloadHandler}></PersonsList>
      <AddPerson reloadHandler={reloadHandler}></AddPerson>
      <DeletePerson reloadHandler={reloadHandler}></DeletePerson>
      <EditPerson reloadHandler={reloadHandler}></EditPerson>
    </ApolloProvider>
    
  );
}

export default App;
