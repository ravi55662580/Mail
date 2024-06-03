import { createSlice } from '@reduxjs/toolkit';

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    receivedMails: [],
    sentMails: [],
  },
  reducers: {
    setReceivedMails(state, action) {
      state.receivedMails = action.payload;
    },
    addReceivedMail(state, action) {
      state.receivedMails.push(action.payload);
    },
    setSentMails(state, action) {
      state.sentMails = action.payload;
    },
    addSentMail(state, action) {
      state.sentMails.push(action.payload);
    },
  },
});

export const { setReceivedMails, addReceivedMail, setSentMails, addSentMail } = mailSlice.actions;
export default mailSlice.reducer;
