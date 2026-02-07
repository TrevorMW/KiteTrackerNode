import Map         from '../../components/Map';
import Tools       from '../../components/Tools';
import NavBar      from '../../components/NavBar';
import NavPanel    from '../../components/NavPanel';
import FilterPanel from '../../components/FilterPanel';

const DashboardPage = () => {
    return (
      <div className="wrapper app">
        <NavBar /> 
        <Map />
        <Tools />
        <NavPanel />
        <FilterPanel />
      </div>
    );
  };
  
  export default DashboardPage;