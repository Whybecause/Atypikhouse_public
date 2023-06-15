import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { notUndefined } from "../utils/helpers/string.helper";
import type { RootState } from "../store";
import * as messageService from "../services/messages/messages.service";
import { onlyUnique } from "../utils/helpers/array-helper";
import { sortByNewestDate } from "../utils/helpers/dates-helper";

export interface IMessage {
  id?: number,
  content?: string,
  createdAt?: string,
  roomId?: number,
  senderId?: number,
  senderName?: string,
  senderImage?: string,
  contactName?: string,
  asBeenRead?: boolean,
  pending?: boolean
}

const messagesAdapter = createEntityAdapter<IMessage>({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
});

export const fetchMessages = createAsyncThunk(
  "/messages/fetchMessages",
  async () => {
    return await messageService.default.fetchMessages();
  }
);

export const addMessage = createAsyncThunk(
  "/messages/addMessage",
  async (messageData: IMessage) => {
    const { id, ...data } = messageData;
    return await messageService.default.addMessage(id, data);
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    displayMessage(state, action) {
      state.status = "succeeded";
      messagesAdapter.addOne(state, action.payload);
    },
    updateMessage(state, action) {
      state.status = "succeeded";
      messagesAdapter.updateOne(state, action.payload);
    },
    messageRead: messagesAdapter.updateOne,
    deleteMessages: messagesAdapter.removeMany
  },
  extraReducers: builder => {
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.status = "succeeded";
      messagesAdapter.upsertMany(state, action.payload.toMeFromMe);
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.status = "failed";
    });

    builder.addCase(addMessage.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
      messagesAdapter.addOne(state, action.payload.result);
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  }
});


export default messagesSlice.reducer;

export const { displayMessage, updateMessage, messageRead, deleteMessages } = messagesSlice.actions;

export const { selectAll: selectAllMessages, selectById: selectMessagesById, selectIds: selectMessagesIds }
  = messagesAdapter.getSelectors<RootState>(state => state.messages);

export const selectRoomsIdsOrdered = createSelector(
  [selectAllMessages],
  (messages) => {
    const ids = messages.map(message => {
      return {
        roomId: message.roomId,
        createdAt: message.createdAt,
      };
    });
    sortByNewestDate(ids);
    const ordered = ids.map(id => id.roomId);
    const unique = ordered.filter(onlyUnique);
    return unique;
  }
);

export const selectMessagesByRoomId = createSelector(
  [selectAllMessages, (state, roomId) => roomId],
  (messages, roomId) => messages.filter(r => r.roomId === roomId)
);
export const selectMessagesIdsByRoomId = createSelector(
  [selectAllMessages, (state, roomId) => roomId],
  (messages, roomId) => messages
    .filter(message => message.roomId === roomId)
    .map(message => message.id)
);

export const selectLastMsgByRoom = createSelector(
  [selectMessagesByRoomId, (state, roomId) => roomId],
  (messages, roomId) => messages[messages.length - 1]
);

export const selectNumberUnreadMessages = createSelector(
  [selectAllMessages, (state, userId) => userId],
  (messages, userId) => {
    const asBeenRead = messages.map(r => {
      if (r.senderId === userId) return;
      if (r.asBeenRead === false) return (r.roomId);
    });
    const result = asBeenRead
      .filter(notUndefined)
      .filter(onlyUnique)
      .length;
    return result;
  }
);
