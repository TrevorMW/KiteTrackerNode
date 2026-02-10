import { useState } from "react";

import Map         from '../../components/Map';
import Tools       from '../../components/Tools';
import NavBar      from '../../components/NavBar';
import NavPanel    from '../../components/NavPanel';
import FilterPanel from '../../components/FilterPanel';

const DashboardPage = () => {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    function handleFilterOpen(){
      setIsFilterPanelOpen(isFilterPanelOpen ? false : true );
    }

    return (
      <>
      <div className="wrapper app">
        <NavBar isMenuOpen={false} isOpen={ isFilterPanelOpen } openFilterPanel={handleFilterOpen}/> 
        <Map />
        <Tools />
        <NavPanel />
        <FilterPanel isOpen={ isFilterPanelOpen } />
      </div>
      </>
    );
  };
  
  export default DashboardPage;