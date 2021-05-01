import React, {useEffect, useState, useCallback} from 'react';
import ModePicker from "../ModePicker/ModePicker";
import Playground from "../Playground/Playground";
import { get } from '../../api/httpRequests';
import HoverDisplay from "../HoverDisplay/HoverDisplay";
import './PlaygroundWrapper.css';
import {useErrorHandler} from "react-error-boundary";
import {nanoid} from 'nanoid';


const PlaygroundWrapper = () => {

  const [field, setField] = useState(5);
  const [cells, setCells] = useState([]);
  const [hoveredCells, setHoveredCells] = useState([]);
  const [error, setError] = useState(null);

  const handleError  = useErrorHandler();

  if (error) handleError(error);

  const updateCells = useCallback(() => {
    const newCells = new Array(field*field).fill(0);
    setCells(newCells);
    setHoveredCells([]);
  }, [field]);

  const fetchField = useCallback(async(mode='easyMode') => {
    const response = await get();
    if (response.isSuccess) {
      const newField = response.payload.data[mode].field;
      setField(newField);
      setError(null);
    } else {
      setError(response.payload)
    }
  }, []);

  useEffect(() => {
    updateCells();
  }, [field, updateCells]);

  useEffect(() => {
    fetchField();
  }, [fetchField]);


  const changeCellColor = (id) => {
    let newCells = [...cells];
    newCells[id] = newCells[id] === 0 ? 1 : 0;
    setCells(newCells);
    updateHoveredCells(id);
  };
  
  const updateHoveredCells = (id) => {
    let newHoveredCells = [...hoveredCells];
    const uniqueId = nanoid();
    newHoveredCells.push({uniqueId, id});
    setHoveredCells(newHoveredCells);
  };

  const handleFormSubmit = async (mode) => {
    updateCells();
    await fetchField(mode);
  };


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