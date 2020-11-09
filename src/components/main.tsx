import React, { ChangeEvent, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/reducers"
import { calculationMethodDidChange, InputChange, inputDidChange } from "../app/slice"
import { H, Mode } from "../utils/calcs"

const Main:React.FC = () => {

  const { result, inputs, error } = useSelector((state: RootState) => ({ 
        result: state.state.result,
        inputs: state.state.inputs,
        error: state.state.error } 
  ))

  const dispatch = useDispatch()

  const options = () => {
    const selectableOptions: Array<JSX.Element> = []
    Object.values(Mode).forEach(mode => {
      selectableOptions.push(<option value={mode} key={mode}>{mode}</option>)
    })
    return selectableOptions
  }

  const booleans = () => {
    return ['A', 'B', 'C'].map(b => 
      <Fragment key={b}>
       <label htmlFor={b}>{b}</label>
        <input type="checkbox" name={b} id={b} onChange={onChangeHandler} />
      </Fragment>
    )
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    if ((event.target.type === 'checkbox')) {
      const p: InputChange = {
        name: event.target.name, value: event.target.checked
      }
      dispatch(inputDidChange(p))
    } else {
      const p: InputChange = {
        name: event.target.name, value: event.target.value
      }
      dispatch(inputDidChange(p))
    }
  }

  const onResolverChangedHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selection = Object.entries(Mode).find(([key, value]) => value === event.target.value);
    if (selection) {
      dispatch(calculationMethodDidChange(selection[1]))
    }
  }

  const errorMessage = <div><h3>Cannot compute that combination</h3></div>

  return <div className="numeric">
    <h2>Select Assigment</h2>
    <div className="panel">
      {booleans()}
    </div>
    
    <div className='center'>
      <div className="vertical-panel">
        <label htmlFor="D">D</label>
        <input type="number" 
               step="0.01" 
               name="D" 
               id="d" 
               onChange={onChangeHandler} 
               defaultValue={inputs.D}
        />
        <label htmlFor="E">E</label>
        <input type="number" name="E" id="e"onChange={onChangeHandler} defaultValue={inputs.E} />
        <label htmlFor="F">F</label>
        <input type="number" name="F" id="f" onChange={onChangeHandler} defaultValue={inputs.F} />
      </div>
      <div className="vertical-panel">
        <div>
          M = {H.M}
        </div>
        <div>
          P = {H.P}
        </div>
        <div>
          T = {H.T}
        </div>
      </div>
      <div className="vertical-panel">
        <label htmlFor="option-select">Choose an option:</label>
        <select name="options" id="option-select" onChange={onResolverChangedHandler}>
            {options()}
        </select>
      </div>
    </div>
    
    <h2>Results</h2>
    <div className="results"> 
    { error ? errorMessage : 
      <><div>
          H =  {result.H}
        </div><div>
            K = {result.K}
          </div>
          <br />
        </>
      }
  </div>
  </div>
}


export default Main