// PARAMS
// error = error response
// setNotifErrMessage = Field info error message within notification pop up message
// setInputErrorMessage = Field info error message alongside with the input label

export const useApiError = (error, setNotifErrMessage, setInputErrorMessage) => {
    if (error) {
        console.log(error.response);
        if (error.response) {
            if (error.response.status >= 400 && error.response.status <= 499) {
        console.log(error.response.data);
                setNotifErrMessage(prev => ({ ...prev, error: error.response.data.message }));
                setInputErrorMessage(prev => ({ ...prev, error: error.response.data.message }));
            } else {
                setNotifErrMessage(prev => ({ ...prev, error: "An unexpected error occurred. Please try again later." }));
            }
        } else if (error.request) {
            setNotifErrMessage(prev => ({ ...prev, error: "Network error: Unable to reach the server. Please check your internet connection and try again." }));
        } else {
            setNotifErrMessage(prev => ({ ...prev, error: "An unexpected error occurred. Please try again later." }));
        }
    }
}

