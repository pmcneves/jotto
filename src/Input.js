import PropTypes from 'prop-types'
import { useState } from 'react'


const Input = ({ success, secretWord }) => {

    const [currentGuess, setCurrentGuess] = useState('')

    if(success) {
        return <div data-test="component-input" />
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box" 
                    className="mb-2 mx-sm-3" 
                    type="text" 
                    placeholder="enter guess"
                    value={currentGuess}
                    onChange={e=>setCurrentGuess(e.target.value)}
                />
                <button 
                    onClick={e => {
                        e.preventDefault()
                        setCurrentGuess("")
                    }
                }
                    data-test="submit-button" 
                    className="btn btn-primary mb-2"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input
