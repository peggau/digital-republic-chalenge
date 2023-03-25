import { useState } from "react";
import React from 'react';

export const WallBlock = ({
    index, setAreaWall,
}) => {

    const windowArea = 2*1.2
    const doorArea = 0.8*1.9

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [doors, setDoors] = useState(0);
    const [windows, setWindows] = useState(0);

    const area_wall = width * height;

    const valid = validarParede(area_wall, height, doors, windows);

    function validarParede(area, height, doors, windows) {
        if (area < 1 || area > 50) {
            return -1
        }
        if ((height < (1.9 + 0.3)) && (doors >= 1)) {
            return -2
        }
        if (doors*doorArea + windows*windowArea > 0.5*area) {
            return -3
        }
        return 1
    }

    return (
        <div>
            <h3> Parede {index} </h3>
            <br/>
            <p>Qual é a altura em metros da parede?</p>
            <div className="focus-input">
                <input
                    onChange={(e) => {setHeight(e.target.value); setAreaWall(e.target.value*width*validarParede(e.target.value*width, e.target.value, doors, windows));}}
                    value={height}
                    type="number"
                    step="0.01"
                    data-placeholder="wallHeight"
                    className="input"
                />
            </div>
            
            <p>Qual é o comprimento em metros da parede?</p>
            <div className="focus-input">
                <input
                    onChange={(e) => {setWidth(e.target.value); setAreaWall(e.target.value*height*validarParede(e.target.value*height, height, doors, windows));}}
                    value={width}
                    type="number"
                    step="0.01"
                    data-placeholder="wallWidth"
                    className="input"
                />
            </div>  

            <p>Quantas portas tem nessa parede?</p>
            <div className="focus-input">
                <input
                    onChange={(e) => {setDoors(e.target.value); setAreaWall(width*height*validarParede(area_wall, height, e.target.value, windows));}}
                    value={doors}
                    type="number"
                    data-placeholder="howManyDoors"
                    className="input"
                />
            </div>
            
            <p>Quantas janelas tem nessa parede?</p>
            <div className="focus-input">
                <input
                    onChange={(e) => {setWindows(e.target.value); setAreaWall(width*height*validarParede(area_wall, height, doors, e.target.value))}}
                    value={windows}
                    type="number"
                    data-placeholder="howManyWindows"
                    className="input"
                />
            </div>

            <p>Sua parede possui {area_wall} metros quadrados.</p>
            <font color="red">
                {(valid === -1) ? "Parede inválida. A área da parede precisa ter entre 1m² e 50m²": ""}
                {(valid === -2) ? "Parede inválida. Paredes com porta precisam ter ao menos 2.2m": ""}
                {(valid === -3) ? "As portas e janelas não podem ocupar mais de 50% da área da parede": ""}
            </font>
            <font color="blue">
                {(valid === 1) ? "Parede válida": ""}
            </font>
        </div>
    );
}