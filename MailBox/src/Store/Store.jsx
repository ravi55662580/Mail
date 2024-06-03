import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './UI-Slice/loader-slice'; // Assuming loader-slice is a file containing your loader slice reducer
import authReducer from './Auth-Slice/auth-slice'; // Assuming auth-slice is a file containing your auth slice reducer
import mailSliceReducer from './Mail-Slice/mail-slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
        mail: mailSliceReducer
    },
});
