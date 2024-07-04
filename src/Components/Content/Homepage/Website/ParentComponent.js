import React, { useState } from 'react';  
import SectionOne from './SectionOne';  
import SectionThree from './SectionThree';  
  
function ParentComponent() {  
    const [isTableComparatorClicked, setIsTableComparatorClicked] = useState(false);  
  
    const handleTableComparatorClick = () => {  
        setIsTableComparatorClicked(true);  
    };  
  
    return (  
        <div>  
            <SectionOne onCompare={handleTableComparatorClick} />  
            <SectionThree isTableComparatorClicked={isTableComparatorClicked} />  
        </div>  
    );  
}  
  
export default ParentComponent;  
