import React from 'react';

const ChooseBttn = ({ 
  doubleBttn, 
  leftBttnLabel, 
  rightBttnLabel, 
  leftBttnFunc, 
  rightBttnFunc, 
  leftBttnType, 
  rightBttnType, 
  singleBttn, 
  singleBttnLabel, 
  singleBttnFunc,
  singleBttnType,
  singleBttnDisable,
  rightBttnDisable,
  leftBttnDisable
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px', 
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
      }}
    >
      {doubleBttn && (
        <>
          <button
            disabled={leftBttnDisable}
            type={leftBttnType || "button"}
            onClick={leftBttnFunc}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: leftBttnDisable ? 'not-allowed' : 'pointer',
            }}
          >
            {leftBttnLabel}
          </button>

          <button
            disabled={rightBttnDisable}
            type={rightBttnType || "button"}
            onClick={rightBttnFunc}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: rightBttnDisable ? 'not-allowed' : 'pointer',
            }}
          >
            {rightBttnLabel}
          </button>
        </>
      )}

      {singleBttn && (
        <button
          disabled={singleBttnDisable}
          type={singleBttnType || "button"}
          onClick={singleBttnFunc}
          style={{
            padding: '10px 20px',
            backgroundColor: '#DC3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: singleBttnDisable ? 'not-allowed' : 'pointer',
          }}
        >
          {singleBttnLabel}
        </button>
      )}
    </div>
  );
};

export default ChooseBttn;
