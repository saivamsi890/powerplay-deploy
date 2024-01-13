import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../Slider/DraggableCard';
import { ETClock, ISTClock, PSTClock, UTCClock } from '../Times/CurrentTimeofAll';

const DraggableContainer = () => {


  const [selectedTimeZone, setSelectedTimeZone] = useState('UST'); 

  const [selectedValues, setSelectedValues] = useState({
    current: '',
    previous: ''
  });

  const timeZones = [
    { label: 'U.S. Eastern Time', value: 'U.S.ET' },
    { label: 'Coordinated Universal Time', value: 'CUT' },
    { label: 'Pacific Standard Time', value: 'PST' },
  ];

  const handleTimeZoneChange = (event) => {
    setSelectedTimeZone(event.target.value);
    setSelectedValues((prevSelectedValues) => ({
      current: event.target.value,
      previous: prevSelectedValues.current
    }));
  };

  const [items, setItems] = useState([
    { id: 1, text: `IST `,rem:'block' , primaryconv:'IST' ,clock:<ISTClock />},
    {id: 2, text: `UST ` ,primaryconv:'UST' ,clock:<UTCClock />},
    {id: 3, text: `PST ` ,primaryconv:'PST' ,clock:<PSTClock />},
    {id: 4, text: `ET ` ,primaryconv:'ET' ,clock:<ETClock />},
  ]);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className='mt-5'>

        </div>
        {items.map((item, index) => (
          <DraggableItem key={item.id} id={item.id} index={index} text={item.text} moveItem={moveItem}
            selectedTimeZone={selectedTimeZone}
            clock = {item.clock}
            pc = {item.primaryconv}
            rem={item.rem}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableContainer;