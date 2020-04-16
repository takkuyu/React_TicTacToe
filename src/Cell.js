import React from 'react';

const Cell = ({value, onClick, location}) => {
    return (
        <div style={{ border: 'black 1px solid', height:'100%', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onClick(location)}>
            <h1 style={{margin:0, padding:0, fontSize: '3em'}}>{value}</h1>
        </div>
    );
}

export default Cell;