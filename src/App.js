// Sobre a regra de negócio número 2, considerei que a área das portas e janelas
// devem ocupar no máximo 50% da área da parede onde estão localizadas, de forma
// individual

import React from 'react';
import { useState } from "react";
import "../src/styles/styles.css";
import { WallBlock } from "./components";

function App() {
  const [areaWall_1, setAreaWall_1] = useState(0);
  const [areaWall_2, setAreaWall_2] = useState(0);
  const [areaWall_3, setAreaWall_3] = useState(0);
  const [areaWall_4, setAreaWall_4] = useState(0);
  var areaTotal = 0

  if (areaWall_1 > 0 && areaWall_2 > 0 && areaWall_3 > 0 && areaWall_4 > 0) {
    areaTotal = areaWall_1 + areaWall_2 + areaWall_3 + areaWall_4;
  }
  else {
    areaTotal = 0;
  }

  const totalLit = areaTotal/5

  function totalCont (totalLit) {
    const optionContainers = [18, 3.6, 2.5, 0.5]
    var containers = {'18': 0, '3.6': 0, '2.5': 0, '0.5': 0}

    for (var optionContainer of optionContainers) {
      var containerInt = Math.floor(totalLit/optionContainer)
      containers[optionContainer] += containerInt
      totalLit -= optionContainer * containerInt
    }

    if (totalLit > 0) {
      containers[0.5] += 1
    }
    return containers;
  }
  const paintContainers = totalCont(totalLit);

  return(
    <div className="container">
      <div className="container-calculator">
        <div className="wrap-calculator">
          <h1 className="calculator-form-title">Calculadora de Tinta</h1>

          <div className="line">
            <div className="box"
              ><WallBlock index="1" setAreaWall={setAreaWall_1} />
            </div>
            <div className="box">
              <WallBlock index="2" setAreaWall={setAreaWall_2} />
             </div>
            <div className="box">
              <WallBlock index="3" setAreaWall={setAreaWall_3} />
            </div>
            <div className="box">
              <WallBlock index="4" setAreaWall={setAreaWall_4} />
            </div>
          </div>
          <div className="box-result line">
            <p>Todas as paredes juntas possuem a área de {areaTotal}m²</p>
            <br/>
            <p>A quantidade de latas a serem usadas é: 
              <br/>Latas de 18 litros: {paintContainers[18]} 
              <br/>Latas de 3.6 litros: {paintContainers[3.6]} 
              <br/>Latas de 2.5 litros: {paintContainers[2.5]} 
              <br/>Latas de 0.5 litros: {paintContainers[0.5]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
