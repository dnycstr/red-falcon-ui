/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Children, useState } from 'react';


interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
}



interface AccordionProps {
    children?: React.ReactNode;
    name: string
}

export const Accordion: React.FC<AccordionProps> = ({ name,children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div>
            <div onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
                {name}
                {isOpen ? <span>&#9651;</span> : <span>&#9661;</span>}
            </div>
            {isOpen && <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'h-auto' : 'h-0'}`}>{children}</div>}
        </div>
    );
};