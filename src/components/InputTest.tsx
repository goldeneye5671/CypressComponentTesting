import React from "react";

interface Props {
    initial: string
  }

const InputTest:React.FC<Props> = ({initial}) => {
    
    const [finalValue, setFinalValue] = React.useState(initial);
    const [showVal, setShowVal] = React.useState(false);

    return (
        <form data-testid="InputTest" action="submit" className="input">
            <label data-testid="final-value-input-label" htmlFor="testinput">Test Input:
                <input 
                    data-testid="final-value-input"
                    name="testinput"
                    value={finalValue}
                    onChange={e => setFinalValue(e.target.value)}
                />
            </label>
            {
                !showVal ?
                    <button 
                        data-testid="show-final-value-button"
                        onClick={e => {e.preventDefault(); setShowVal(true)}}
                        className="input__submit"
                        type="submit"
                    >
                        Show
                    </button>
                :
                    <>
                        <p
                            data-testid="final-value-display"
                        >
                            {finalValue}
                        </p>
                        <button
                            data-testid="hide-final-value-button"
                            onClick={e => {e.preventDefault(); setShowVal(false)}}
                            className="input__submit"
                            type="submit"
                        >
                            Hide
                        </button>
                    </>

            }
        </form>
    )
}

export default InputTest