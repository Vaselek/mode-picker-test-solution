import React, {useEffect, useState} from 'react';
import ModePicker from "../ModePicker/ModePicker";
import Playground from "../Playground/Playground";
import { get } from '../../api/httpRequests';
import HoverDisplay from "../HoverDisplay/HoverDisplay";
import './PlaygroundWrapper.css';
import ErrorFallback from "../ErrorFallback/ErrorFallback";

const PlaygroundWrapper = () => {

  const [field, setField] = useState(5);
  const [cells, setCells] = useState([]);
  const [hoveredCells, setHoveredCells] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    updateCells();
  }, [field]);

  useEffect(async () => {
    await fetchField();
    updateCells();
  }, []);

  const changeCellColor = (id) => {
    let newCells = [...cells];
    newCells[id] = newCells[id] === 0 ? 1 : 0;
    setCells(newCells);
    updateHoveredCells(id);
  };
  
  const updateHoveredCells = (id) => {
    let newHoveredCells = [...hoveredCells];
    newHoveredCells.push(id);
    setHoveredCells(newHoveredCells);
  };

  const fetchField = async (mode='easyMode') => {
    const response = await get();
    if (response.isSuccess) {
      const newField = response.payload.data[mode].field;
      setField(newField);
    } else {
      setError(response.payload)
    }
  };

  const updateCells = () => {
    const newCells = new Array(field*field).fill(0);
    setCells(newCells);
    setHoveredCells([]);
  };


  const handleFormSubmit = async (mode) => {
    await fetchField(mode);
  };

  if (error) return <ErrorFallback error={error}/>

  return (
    <div className='playgroundWrapper'>
      <div className='mainSection'>
        <ModePicker handleFormSubmit={handleFormSubmit}/>
        <Playground cells={cells} changeCellColor={changeCellColor} field={field}/>
      </div>
      <HoverDisplay field={field} hoveredCells={hoveredCells} />
    </div>
  );
};

export default PlaygroundWrapper;