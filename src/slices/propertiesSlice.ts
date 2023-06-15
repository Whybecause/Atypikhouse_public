import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { RootState } from "../store";
import { IAdress } from "./adressesSlice";
import * as propertiesService from "../services/properties/properties-service";
import * as commentaryService from "../services/commentary/commentary.service";
import * as historicalService from "../services/historical/historical.service";
import * as adminService from "../services/admin/admin-service";
import { flatten, onlyUnique } from "../utils/helpers/array-helper";
import { formatDateForSearch, getDatesBetweenDates, sortByNewestDate, sortByNewestDateStart } from "../utils/helpers/dates-helper";
import { formatedString, notUndefined } from "../utils/helpers/string.helper";
import { IPropertyType } from "./propertyTypesSlice";


export interface IImage {
  id?: number,
  publicID?: string,
  uri?: string,
  alt?: string
}

export interface ICommentRate {
  id?: number,
  historicalId?: number,
  propertyId?: number,
  content?: string,
  rate?: number
}

interface IEquipmentsJSON {
  input: [
    {
      label: string,
      value: number
    }
  ]
}

export interface IProperty {
  id?: number,
  createdAt?: Date,
  name?: string,
  description?: string,
  images?: IImage,
  equipementType?: [
    {
      id: number,
      label: string
    }
  ],
  propertyType?: IPropertyType,
  propertyTypeId?: number,
  equipments?: {
    input: IEquipmentsJSON
  },
  price?: number,
  rate?: number,
  userId?: number,
  user?: {
    mainAdressId: number
  },
  adressId?: number,
  adress?: IAdress,
  commentary?: ICommentary,
  historical?: IVote
}

interface IUser {
  name: string,
  email: string,
  image: any,
  customImage: any
}

export interface IHistoricalProperty {
  userId: number
}

interface ICommentary {
  content: string,
  createdAt: string,
  historicalId: number,
  id: number,
  propertyId: number,
  userId: number
}

interface IVote {
  historicalId: number,
  id: number,
  propertyId: number,
  rate: number,
  userId: number
}

export interface IHistorical {
  id?: number,
  userId?: number,
  propertyId?: number,
  user?: IUser,
  property?: IHistoricalProperty,
  dateStart: string,
  dateEnd: string,
  price: number,
  commentary?: ICommentary,
  vote?: IVote
}

const historicalAdapter = createEntityAdapter<IHistorical>({
  sortComparer: (a, b) => a.dateStart.localeCompare(b.dateStart)
});

const propertiesAdapter = createEntityAdapter<IProperty>();


// ------------------ PROPERTIES ASYNC ----------------------------//

export const fetchProperties = createAsyncThunk(
  "/properties/fetchproperties",
  async () => {
    return await propertiesService.default.fetchProperties();
  }
);

export const addNewProperty = createAsyncThunk(
  "/properties/addNewProperty",
  async (initialProperty: IProperty) => {
    return await propertiesService.default.addProperty(initialProperty);
  }
);
export interface IUpdateProperty {
  id?: number,
  data?: any,
  image?: any,
  oldImage?: any
}

export const adminUpdateProperty = createAsyncThunk(
  "/properties/admin/updateProperty",
  async (initialProperty: IUpdateProperty) => {
    const { id, ...data } = initialProperty;
    return await adminService.default.updateProperty(id, data);
  }
);
export const updateProperty = createAsyncThunk(
  "/properties/updateProperty",
  async (initialProperty: IUpdateProperty) => {
    const { id, ...data } = initialProperty;
    return await propertiesService.default.updateProperty(id, data);
  }
);

export const addCommentary = createAsyncThunk(
  "property/addCommentary",
  async (initialProperty: ICommentRate) => {
    const { propertyId, ...data } = initialProperty;
    return await commentaryService.default.addCommentary(propertyId, data);
  }
);


// ------------------ HISTORICAL ASYNC ------------------------//

//enable host to prevent some dates to be bookable
export const addUnavailableDates = createAsyncThunk(
  "/historical/addUnavailableDate",
  async (initialHisto: IHistorical) => {
    const { id, ...data } = initialHisto;
    return await historicalService.default.addUnavailableDates(id, data);
  }
);


// ----------Properties Slice --------------------//

const propertiesSlice = createSlice({
  name: "properties",
  initialState: propertiesAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    removeProperty: propertiesAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.status = "succeeded";
      propertiesAdapter.upsertMany(state, action.payload.result);
    });
    builder.addCase(addNewProperty.fulfilled, (state, action) => {
      propertiesAdapter.addOne(state, action.payload.result);
    });
    builder.addCase(adminUpdateProperty.fulfilled, (state, action) => {
      propertiesAdapter.upsertOne(state, action.payload.result);
    });
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      propertiesAdapter.updateOne(state, action.payload.result);
    });
  }
});

// ------------------ Historical Slice ----------------------- //

const historicalSlice = createSlice({
  name: "historical",
  initialState: historicalAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    adminEditComment(state, action) {
      const { id } = action.payload;
      const { content } = action.payload.data;
      const comment = state.entities[id].commentary;
      comment[0].content = content;
    },
    adminRemoveComment(state, action) {
      const { historicalId } = action.payload;
      const historical = state.entities[historicalId];
      historical.commentary = undefined;
      historical.vote = undefined;
    },
    createReservation(state, action) {
      historicalAdapter.addOne(state, action.payload);
    },
    deleteReservation: historicalAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.payload.result.length) {
        const historical = flatten(action.payload.result.map(property => property.historical));
        historicalAdapter.upsertMany(state, historical);
      }
    });
    builder.addCase(addUnavailableDates.fulfilled, (state, action) => {
      state.status = "succeeded";
      historicalAdapter.upsertOne(state, action.payload.historique);
    });
    builder.addCase(addCommentary.fulfilled, (state, action) => {
      historicalAdapter.upsertOne(state, action.payload.updatedHistorical);
    });
  }
});

// ---------------- GENERIQUE SELECTORS --------------- //


export const { selectAll: selectAllProperties, selectById: selectPropertiesById, selectIds: selectPropertiesIds }
  = propertiesAdapter.getSelectors<RootState>(state => state.properties);

export const { selectAll: selectAllHistorical, selectById: selectHistoricalById, selectIds: selectHistoricalIds }
  = historicalAdapter.getSelectors<RootState>(state => state.historical);

// ---------------------- PROPERTIES SELECTORS --------------//

export const selectHostProperties = createSelector(
  [selectAllProperties, (_, userId) => userId],
  (properties, userId) => properties.filter(property => property.userId === userId)
);

export const selectPropertyByAdress = createSelector(
  [selectAllProperties, (_, adressId) => adressId],
  (properties, adressId) => properties.some(property => property.adressId === adressId)
);

export const selectHostIds = createSelector(
  [selectAllProperties],
  (properties) =>
    properties.map(property => property.userId)
      .filter(onlyUnique)
);

export const selectSearchedProperties = createSelector(
  [selectAllProperties, (_, query) => query],
  (properties, query) => {
    const { pid, name, typeId, dateStart, dateEnd } = query;
    let filteredProperties = properties;

    // don't show property in search if owner has set his main adress as the adress of the property
    filteredProperties = filteredProperties.filter(property => property?.user?.mainAdressId !== property?.adressId);

    // Si on passe un ZIPCode du style 77 -> ca veut dire qu'on cherche un département et du coup on compare par rapport au ZIPCode
    if (pid && pid?.length === 2 && pid !== "France") {
      filteredProperties =
        filteredProperties.filter(
          property => String(property.adress.ZIPCode).includes(String(query.pid).slice(0, 2)));
    }

    //Si on passe un ZIPCode complet, ca veut dire qu'on cherche un ville
    if (pid && name && pid?.length > 2 && pid !== "France") {
      filteredProperties =
        filteredProperties.filter(
          property => formatedString(property.adress.city).includes(formatedString(String(query.name))));
    }

    if (typeId) {
      filteredProperties =
        filteredProperties.filter(
          property => property.propertyTypeId === parseInt(typeId)
        );
    }
    if (dateStart && dateEnd) {
      filteredProperties =
        filteredProperties.map(property => {
          const busyOrNot = property.historical["map"](histo => {
            if (
              dateStart >= formatDateForSearch(histo.dateStart) &&
              dateStart <= formatDateForSearch(histo.dateEnd) ||
              dateEnd >= formatDateForSearch(histo.dateStart) &&
              dateEnd <= formatDateForSearch(histo.dateEnd)
            ) {
              return true;
            }
          });
          if (!busyOrNot.includes(true)) {
            return property;
          }
        });
    }

    return filteredProperties.filter(notUndefined);
  }
);

export const selectNumberOfPropertiesByPropertyType = createSelector(
  [selectAllProperties, (_, propertyTypeId) => propertyTypeId],
  (properties, propertyTypeId) => properties
    .filter(property => property.propertyTypeId === propertyTypeId)
    .map(property => property.id)
);

// ---------------------- HISTORICAL SELECTORS --------------//
export const selectReviewByProperty = createSelector(
  [selectAllHistorical, (_, propertyId) => propertyId],
  (historical, propertyId) => {
    const data = [];
    historical
      .filter(histo => histo.propertyId === propertyId)
      .map(histo => {
        if (!histo?.commentary?.["length"]) {
          return;
        }
        data.push({
          historicalId: histo?.id,
          propertyId: histo?.propertyId,
          commentary: histo?.commentary?.[0],
          createdAt: histo?.commentary?.[0]?.createdAt,
          vote: histo?.vote?.[0],
          userName: histo?.user?.name,
          userImage: histo?.user?.customImage ? histo?.user?.customImage?.uri : histo?.user?.image
        });
      });
    sortByNewestDate(data);

    return data;
  }
);

export const selectReviewByUser = createSelector(
  [selectAllHistorical, (_, userId) => userId],
  (historical, userId) => {
    const data = [];

    historical
      .filter(histo => histo.userId === userId)
      .map(histo => {

        if (!histo.commentary?.["length"]) {
          return;
        }

        data.push({
          commentary: histo?.commentary[0],
          vote: histo?.vote[0],
          userName: histo.user.name,
          userImage: histo?.user?.customImage ? histo.user.customImage.uri : histo.user.image,
          historicalId: histo.id,
          propertyId: histo.propertyId
        });

      });

    return data;
  }
);

export const selectHostReservations = createSelector(
  [selectAllHistorical, (_, userId) => userId],
  (historical, userId) =>
    historical.filter(histo =>
      histo.property.userId === userId &&
      histo.userId !== userId &&
      dayjs(histo.dateEnd) > dayjs().startOf("day")
    )
);

export const selectHostHistorical = createSelector(
  [selectAllHistorical, (_, userId) => userId],
  (historical, userId) => {
    const histo = historical.filter(histo =>
      histo.property.userId === userId &&
      histo.userId !== userId &&
      dayjs(histo.dateEnd) < dayjs().startOf("day")
    );
    sortByNewestDateStart(histo);
    return histo;
  }
);

export const selectHostHistoricalByPropertyId = createSelector(
  [selectAllHistorical, (_, propertyId) => propertyId],
  (historical, propertyId) =>
    historical.filter(histo => histo.propertyId === propertyId)
      .map(histo => {
        const { id, dateStart: start, dateEnd: end } = histo;
        const title = histo.price == 0 ? "Indisponible" : histo.user.name + " " + "-" + " " + histo.price + "€";
        const hexColor = histo.price == 0 ? "tomato" : "#3B78DD";
        return { id, start, end, title, hexColor, allDays: true };
      })
);

export const selectTenantCurrentReservations = createSelector(
  [selectAllHistorical, (_, userId) => userId],
  (historical, userId) =>
    historical.filter(histo =>
      histo.userId === userId &&
      dayjs(histo.dateEnd) > dayjs().startOf("day")
    )
);

export const selectTenantFinishedReservations = createSelector(
  [selectAllHistorical, (_, userId) => userId],
  (historical, userId) => {
    const histo = historical.filter(histo =>
      histo.userId === userId &&
      dayjs(histo.dateEnd) < dayjs().startOf("day")
    );
    sortByNewestDateStart(histo);
    return histo;
  }
);

export const selectUnavailableDatesByPropertyId = createSelector(
  [selectAllHistorical, (_, propertyId) => propertyId],
  (historical, propertyId) =>
    flatten(historical.filter(histo => histo.propertyId === propertyId)
      .map(histo => getDatesBetweenDates(new Date(histo.dateStart), new Date(histo.dateEnd))))
);

export default {
  properties: propertiesSlice.reducer,
  historical: historicalSlice.reducer
};

export const { adminEditComment, adminRemoveComment, createReservation, deleteReservation } = historicalSlice.actions;
export const { removeProperty } = propertiesSlice.actions;
