const commentary = {
  createdAt: "2021-09-03T16:02:48.860Z",
  content: "coucou",
  createdAt: "2021-09-03T16:02:48.860Z",
  historicalId: 1,
  id: 1,
  propertyId: 1,
}

const commentary2 = {
  createdAt: "2021-09-03T16:02:48.860Z",
  content: "coucou",
  createdAt: "2021-09-03T16:02:48.860Z",
  historicalId: 2,
  id: 2,
  propertyId: 2,
}

const vote = {
  historicalId: 1,
  id: 1,
  propertyId: 1,
  rate: 5,
  userId: 1,
}

const vote2 = {
  historicalId: 2,
  id: 2,
  propertyId: 2,
  rate: 5,
  userId: 2,
}

export const mockedReview = {
  commentary: commentary,
  historicalId: 1,
  propertyId: 1,
  userImage: "http://res.cloudinary.com/hyssuvwg1/image/upload/v1629890886/qcnupuhfpi9r41ag8c5d.webp",
  userName: "Maxence Traina",
  vote: vote
}

const mockedReview2 = {
  commentary: commentary2,
  historicalId: 2,
  propertyId: 2,
  userImage: "http://res.cloudinary.com/hyssuvwg1/image/upload/v1629890886/qcnupuhfpi9r41ag8c5d.webp",
  userName: "Maxence Traina",
  vote: vote2
}

export const mockedReviews = [
  mockedReview,
  mockedReview2
]
