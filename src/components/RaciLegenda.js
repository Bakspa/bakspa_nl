import React from 'react';

// Gebruik in een blog: <RaciLegenda />
export default function RaciLegenda() {
  return (
    <p className="raci-legend">
      <span className="raci raci-a">A</span> Accountable: eindverantwoordelijk, één per regel &nbsp;
      <span className="raci raci-r">R</span> Responsible: voert uit &nbsp;
      <span className="raci raci-c">C</span> Consulted: denkt mee &nbsp;
      <span className="raci raci-i">I</span> Informed: wordt geïnformeerd
    </p>
  );
}
