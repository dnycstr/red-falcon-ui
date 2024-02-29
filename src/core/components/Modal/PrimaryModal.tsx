/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
    modal_name: string;
}





export const PrimaryModal :React.FC<Props> = ({modal_name, children, onClick}) =>{
    const [showModal,setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {modal_name}
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto relative">
                        <div className="modal-close absolute top-0 right-0 cursor-pointer mt-4 mr-4 text-white text-sm z-50" onClick={toggleModal}>
                            <svg
                                className="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    d="M4.5 4.5l9 9m0-9l-9 9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className="modal-content py-4 text-left px-6" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                            {children}
                        </div>

                        {/* Close button inside modal content */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 right-0 m-4" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};