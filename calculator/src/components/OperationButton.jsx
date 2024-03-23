import { ACTIONS } from './Action'

export default function DigitButton({ dispatch, operation }) {
    return <button onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation:  operation} })}>
        {operation}
    </button>
}