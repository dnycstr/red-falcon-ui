/* eslint-disable prettier/prettier */
export const Contact = () => {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold mb-4 p-4">Contacts</h1>

                <CreateContact />
                <Link to="CreateContact">Add a Contact</Link>
                <Link to="contact">Contact us</Link>
            </div>
        </dib>
    )
}