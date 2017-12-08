const initialState = {
    title: "React and Redux",
    user: "SlingMaster",
    year: 2015,
    show_form: false
}

export default function appInfo(state = initialState, action) {
    switch (action.type) {
        case "SEND_REQUEST_DAY":
            console.info("appInfo SEND_REQUEST_DAY")
            return { ...state, year: action.payload }
        case "SEND_REQUEST_HALF_DAY":
            console.info("appInfo SEND_REQUEST_HALF_DAY")
            return { ...state, show_form: !state.show_form }
        case "SEND_REQUEST_3_HOUR":
            console.info("appInfo SEND_REQUEST_3_HOUR")
            return { ...state, show_form: !state.show_form }
        default:
            return state
    }
}