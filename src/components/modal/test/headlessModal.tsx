import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import CreateUserForm from '../../form/user/createUserForm'

function HeadlessModal() {

  const [isOpen, setIsOpen] = useState(false)

  return (<>
    <button className="green-button" onClick={()=>setIsOpen(true)}>Open Headless Modal</button>
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
          <Dialog.Title className="text-emerald-600 text-2xl">Create User</Dialog.Title>
          <CreateUserForm/>
          <div>
            <button className="green-button" onClick={()=>setIsOpen(false)}>Close</button>
            <button className="green-button" onClick={()=>setIsOpen(false)}>Save</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
    </>)
}

export default HeadlessModal