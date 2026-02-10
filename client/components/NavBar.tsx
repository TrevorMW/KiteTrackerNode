type Props = {
    isOpen: Boolean;
    isMenuOpen: Boolean;
    openFilterPanel: () => void;
}

const NavBar = ({ openFilterPanel, isOpen, isMenuOpen }: Props) => {
    console.log('NAVBAR OPEN: ', isOpen)

    return (
        <div className="wrapper mainNav">
            <div className="navPanelTrigger">
                <a><span className="material-symbols-outlined">{ isMenuOpen ? 'close' : 'menu' }</span></a>
            </div>
            <div className="logo">
                <a href="/"><img src="./assets/images/kiteLogo.png" alt="" title="" /></a>
            </div>
            <div className="filterPanelTrigger">
                <a onClick={openFilterPanel}><span className="material-symbols-outlined">{ isOpen ? 'close' : 'tune' }</span></a>
            </div>
        </div>
    );
};

export default NavBar;