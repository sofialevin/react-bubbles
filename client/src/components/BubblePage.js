import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
    .then(res => {
        console.log(res.data);
        setColorList(res.data);
        setIsUpdated(true);
    })
    .catch(err => {
        console.log(err);
    })
}, [isUpdated])

const updateColors = () => {
  setIsUpdated(false)
}

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} updateColors={updateColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
