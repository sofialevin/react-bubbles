import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
              updateColors();
              setEditing(false);
            })
            .catch(err => {
                console.log(err);
            })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/colors/`, newColor)
            .then(res => {
              updateColors();
            })
            .catch(err => {
                console.log(err);
            })
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
            .then(res => {
              updateColors();
            })
            .catch(err => {
                console.log(err);
            })
  };

  const handleChange = event => {
    event.target.name === "color" ?
    setNewColor({...newColor, 
      color: event.target.value
    }) : setNewColor({...newColor, 
      code: { hex: event.target.value}
    });
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <input name="color" value={newColor.color} onChange={handleChange} placeholder="Color Name"></input>
        <input name="hex" value={newColor.code.hex} onChange={handleChange} placeholder="Hex Value"></input>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
