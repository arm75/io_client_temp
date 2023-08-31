import { useState, useEffect } from 'react'
import './App.css'
import TablePage from '../../tablePadsrhtyhdhyge'
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';
import Modal from '../../components/modal/template/modal';
import HeadlessModal from '../../components/modal/test/headlessModal';
import HeadlessDropDown from '../../components/modal/test/headlessDropDown';
//import { Tab } from '@headlessui/react'

function App() {
  const [count, setCount] = useState(101)
  const { keycloak, initialized } = useKeycloak();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  const getProfile = async () => {
    if (keycloak.authenticated) {
      const user: KeycloakProfile = await keycloak.loadUserProfile()
      console.log({user})      
    }
  }

  useEffect( () => {
    getProfile();
    return
  })
  
  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  const username = keycloak.tokenParsed?.preferred_username
 
  return (
    <>
      <h1 className="text-6xl text-red-500 font-bold m-6">You are logged in <span className="text-amber-500">{username}</span>. Welcome!</h1>
      <button className="green-button" onClick={handleLogout}>Log out</button>
      {/* <Tab.Group onChange={(index) => { console.log('Changed selected tab to:', index) } }>
      <Tab.List className="sky-tab-list">
        <Tab className={({ selected }) => `${selected ? 'sky-tab-selected' : 'sky-tab'}`}>Count</Tab>
        <Tab className={({ selected }) => `${selected ? 'sky-tab-selected' : 'sky-tab'}`}>Modals</Tab>
        <Tab className={({ selected }) => `${selected ? 'sky-tab-selected' : 'sky-tab'}`}>Headless Modals</Tab>
        <Tab className={({ selected }) => `${selected ? 'sky-tab-selected' : 'sky-tab'}`}>Headless Dropdown</Tab>
        <Tab className={({ selected }) => `${selected ? 'sky-tab-selected' : 'sky-tab'}`}>Tables</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <h1 className="text-7xl text-indigo-500 font-bold m-6" >Count: {count}</h1>
          <button className="green-button" onClick={()=>{setCount(count-1)}}>Count --</button>      
          <button className="green-button" onClick={()=>{setCount(count+1)}}>Count ++</button>    
        </Tab.Panel>
        <Tab.Panel>
          <button className="green-button" onClick={openModal}>Open Modal</button>  
        </Tab.Panel>
        <Tab.Panel>
          <HeadlessModal/>
        </Tab.Panel>        
        <Tab.Panel>
          <HeadlessDropDown/>  
        </Tab.Panel>
        <Tab.Panel>
          <TablePage/>  
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>     */}
    <Modal isOpen={isOpen} onClose={closeModal}>
        <h2>Modal Title</h2>        
    </Modal>      
    </>
  )
}

export default App
