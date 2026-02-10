import { useState } from 'react';
import SightingForm from '../components/SightingForm';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSightingsForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(isOpen ? false : true);
    };

    return (
        <div className={`wrapper tools ${isOpen ? 'active' : '' }`}>
            <div className="sightingButton">
                <button id="openSightingForm" onClick={toggleSightingsForm}>Report a Sighting</button>
            </div>
            <div className="wrapper sightingForm">
                <button data-panel-close className="noBtn" onClick={toggleSightingsForm}>&times;</button>
                <h1>Report a Sighting</h1>
                <SightingForm />
            </div>
        </div>
    );
};

export default NavBar;