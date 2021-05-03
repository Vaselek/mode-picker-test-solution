import React, {useEffect, useState, useCallback} from 'react';
import ModePicker from "../ModePicker/ModePicker";
import Playground from "../Playground/Playground";
import { get } from '../../api/httpRequests';
import HoverDisplay from "../HoverDisplay/HoverDisplay";
import './PlaygroundWrapper.css';
import {useErrorHandler} from "react-error-boundary";
import {nanoid} from 'nanoid';
import Loading from "../Loading/Loading";


const PlaygroundWrapper = () => {

  const [field, setField] = useState(null);
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


  const changeCellColor = (index) => {
    let newCells = [...cells];
    newCells[index] = newCells[index] === 0 ? 1 : 0;
    setCells(newCells);
    updateHoveredCells(index);
  };
  
  const updateHoveredCells = (index) => {
    let newHoveredCells = [...hoveredCells];
    const uniqueId = nanoid();
    newHoveredCells.push({uniqueId, index});
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
        { field ? <Playground cells={cells} changeCellColor={changeCellColor} field={field}/> : <Loading />  }
      </div>
      <HoverDisplay field={field} hoveredCells={hoveredCells} />
    </div>
  );
};

export default PlaygroundWrapper;