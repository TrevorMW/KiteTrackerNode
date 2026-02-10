import { Tag } from "../../shared/types/tag";

import { useTags } from "./useTags";

import { slugify } from "../../shared/helpers/stringHelper";

type Props = {
    isOpen: Boolean;
};

const FilterPanel = ({ isOpen }: Props) => {
    const { tags } = useTags();

    function applyFilter(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.checked);
        
    }

    return (
        <div data-panel data-panel-direction="right" className={ isOpen ? 'active' : '' }>
            <div className="wrapper filters">
                <h1>Filter Sightings</h1>
                <fieldset>
                    <legend>Activity Type:</legend>

                    <ul className="sightingTagTypes sightingTagFilters">
                        { tags.map(tag => (
                            <li key={tag.tagValue}>
                                <label htmlFor={slugify(tag.tagName)}>
                                    <input type="checkbox" id={slugify(tag.tagName)} value={tag.tagValue} onChange={ applyFilter } /> 
                                    {tag.tagName}
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </div>
        </div>
    );
};

export default FilterPanel;