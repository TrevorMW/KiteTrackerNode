const NavBar = () => {
    return (
        <div className="wrapper mainNav">
            <div className="navPanelTrigger">
                <a><span className="material-symbols-outlined">menu</span></a>
            </div>
            <div className="logo">
                <a href="/"><img src="./assets/images/kiteLogo.png" alt="" title="" /></a>
            </div>
            <div className="filterPanelTrigger">
                <a><span className="material-symbols-outlined">tune</span></a>
            </div>
        </div>
    );
};

export default NavBar;