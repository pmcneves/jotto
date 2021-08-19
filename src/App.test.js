import {shallow, mount} from 'enzyme'
import App from './App'
import {findByTestAttr} from './test/testUtils'

//active global mock to make sure getSecretWord doesn't make network calls
jest.mock('./actions')
import {getSecretWord as mockGetSecretWord} from './actions'
import React from 'react'

/**
 * Setup function for App component
 * @returns {ShallowWraper}
 */

const setup = () => {
    // use mount, because useEffect not called on `shallow`
    return mount(<App/>)
}

describe.each([
    [null, true, false],
    ['party', false, true],
])(
    'renders with secretWord as %s', (secretWord, loadingShows, appShows) => {
        let wrapper
        let originalUseReducer

        beforeEach(() => {
            originalUseReducer = React.useReducer

            const mockUseReducer = jest.fn()
                .mockReturnValue([
                    { secretWord },
                    jest.fn()//dispatch is not useful in this test
                ])
            React.useReducer = mockUseReducer
            wrapper = setup()
        })
        afterEach(() => {
            React.useReducer = originalUseReducer
        })
        test(`renders loading spinner: ${loadingShows}`, () => {
            const spinner = findByTestAttr(wrapper, 'spinner')
            expect(spinner.exists()).toBe(loadingShows)
        })
        test(`renders app: ${appShows}`, () => {
            const app = findByTestAttr(wrapper, 'component-app')
            expect(app.exists()).toBe(appShows)
        })
    }
)

describe('get secret word - useEffect ', () => {
    beforeEach(() => {
        //clear the mock calls from previous tests - avoid side effects
        mockGetSecretWord.mockClear()
    })

    test('getSecretWord on app mount', () => {
        const wrapper = setup()

        expect(mockGetSecretWord).toHaveBeenCalledTimes(1)
    })
    test('getSecretWord does not run on app update', () => {
        const wrapper = setup()
        mockGetSecretWord.mockClear() //clear the mock that was called on setup

        // using setProps because wrapper.update() doesn't trigger useEffect
        wrapper.setProps() 

        expect(mockGetSecretWord).toHaveBeenCalledTimes(0)
    })
})