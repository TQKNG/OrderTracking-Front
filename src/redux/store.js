import {configureStore} from "@reduxjs/toolkit"
import adminSlice from "./features/admin/adminSlice"
import trackingSlice from "./features/tracking/trackingSlice"

export const store = configureStore({
    reducer:{
        tracking: trackingSlice,
        admin: adminSlice
    }
})

