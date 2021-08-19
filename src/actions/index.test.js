import moxios from 'moxios'
import {getSecretWord} from './'

describe('getSecretWord', () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })

    test('secretWord is returned', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({ //moxios mimics serve response
                status: 200,
                response: 'party',
            })
        })
        
        const mockSetSecretWord = jest.fn()

        await getSecretWord(mockSetSecretWord)
        expect(mockSetSecretWord).toHaveBeenCalledWith('party')

    })
})