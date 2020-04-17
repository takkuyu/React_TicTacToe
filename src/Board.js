import React from 'react';
import Cell from './Cell';


const Board = ({ board, onClick }) => {
    const cells = board.map((value, index) => {
        return (
            <Cell
                location={index}
                value={value}
                key={index}
                onClick={onClick}
            />
        )
    })

    return (
        <div style={{ width: '300px', height: '300px', margin: '100px', display: 'grid', gridTemplateColumns: '100px 100px 100px ', gridTemplateRows: '100px 100px 100px ', border: 'black 1px solid' }}>
            {cells}
        </div>
    );
}

export default Board;