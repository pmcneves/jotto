import { shallow } from "enzyme";
import Input from "./Input";
import { checkProps, findByTestAttr } from "./test/testUtils";
import React from 'react'


const setup = (success = false, secretWord='party') => {
    return shallow(<Input success={success} secretWord={secretWord}/>)
}


describe( 'render', () => {
    describe('success is true', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup(true)
        })

        test ('Input renders without error', () => {
            const component = findByTestAttr(wrapper, 'component-input')
            expect(component.length).toBe(1)
        })

        test (' input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, "input-box")
            expect(inputBox.exists()).toBe(false)
        })

        test('submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(false)
        })
    })
    describe('success is false', () => {
        let wrapper
        beforeEach(() => {
            wrapper = setup(false)
        })

        test ('Input renders without error', () => {
            const component = findByTestAttr(wrapper, 'component-input')
            expect(component.length).toBe(1)
        })

        test (' input box shows', () => {
            const inputBox = findByTestAttr(wrapper, "input-box")
            expect(inputBox.exists()).toBe(true)
        })

        test('submit button shows', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(true)
        })

    })
})



test('does not throw warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'})
})

describe('state controled input field', () => {

    let mockSetCurrentGuess = jest.fn()
    let wrapper
    let originalUseState

    beforeEach(() => {
        mockSetCurrentGuess.mockClear()
        originalUseState = React.useState
        React.useState = () => ["", mockSetCurrentGuess] //replacement function for useState 
        wrapper = setup()
    })

    afterEach( () => {
        React.useState = originalUseState
    })

    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')
        const mockEvent = { target: {value: 'train'} }
        inputBox.simulate("change", mockEvent)
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    })

    test('state updates to empty string after submit button click', () => {
        const button = findByTestAttr(wrapper, "submit-button")
        button.simulate('click', { preventDefault() {} })
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("")
    })
})