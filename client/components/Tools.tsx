import { useState } from 'react';
import SightingForm from '../components/SightingForm';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openSightingsForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(true);
    };

    return (
        <div className={`wrapper tools ${isOpen ? 'active' : '' }`}>
            <div className="sightingButton">
                <button id="openSightingForm" onClick={openSightingsForm}>Report a Sighting</button>
            </div>
            <div className="wrapper sightingForm">
                <h1>Report a Sighting</h1>
                <SightingForm />
            </div>
        </div>
    );
};

export default NavBar;