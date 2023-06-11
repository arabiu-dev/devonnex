import axios from "axios";
import nookies from "nookies";

// Checks if a user exists
const checkIfUserExist = async (username) => {
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/users/${
        username.trim() || "null"
      }/exist`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchUserGigs = async (id, username) => {
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/user/gigs?user_id=${id}&username=${username}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchUserReviews = async (username) => {
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/user/reviews?username=${username}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

// fetch user comments
const fetchUserComments = async (id) => {
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/user/comments?user_id=${id}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

// Retrieves a user
const getUser = async ({ queryKey }) => {
  if (!queryKey[1]) return;
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/users/${queryKey[1].uid}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Creates a user
const createUser = async ({ photoData, reqData }) => {
  try {
    const photoIdResponse = await axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dqzvvp77h/auto/upload",
      data: photoData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const photoId = photoIdResponse.data.public_id;

    reqData.user["image_url"] = photoId;
    const userResponse = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/users/",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    const { username, image_url, id } = userResponse.data;
    const cookies = nookies.get();

    const chatData = {
      username,
      password: cookies["_psw_"] ? cookies["_psw_"] : id,
      photo: image_url,
    };

    const chatResponse = await axios({
      method: "post",
      url: "https://chat.devonnex.tech/app/signup",
      data: chatData,
      headers: { "Content-Type": "application/json" },
    });

    return userResponse.data;
  } catch (err) {
    throw err;
  }
};

// Login to the chat system
const chatLogin = async ({ username, password }) => {
  try {
    const chatResponse = await axios({
      method: "post",
      url: "https://chat.devonnex.tech/app/signin",
      data: { username, password },
      headers: { "Content-Type": "application/json" },
    });

    return chatResponse.data;
  } catch (err) {
    throw err;
  }
};

// Creates a post
const createPost = async ({ photoData, reqData, paraData }) => {
  try {
    const photoIdResponse = await axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dqzvvp77h/auto/upload",
      data: photoData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const photoId = photoIdResponse.data.public_id;

    reqData.post["image_url"] = photoId;
    let response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/posts/",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    paraData.paragraph = paraData.paragraph.map((i) => ({
      ...i,
      post_id: response.data.id,
    }));

    response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/paragraphs/",
      data: paraData,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Retrieves a post
const getPost = async ({ queryKey }) => {
  if (!queryKey[1]) return;
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/posts/${queryKey[1]}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Updates a post
const updatePost = async ({ photoData, reqData, paraData }) => {
  try {
    if (photoData) {
      const photoIdResponse = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/dqzvvp77h/auto/upload",
        data: photoData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photoId = photoIdResponse.data.public_id;

      reqData.post["image_url"] = photoId;
    }

    let response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/posts/${reqData.post.id}`,
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    paraData.paragraph = paraData.paragraph.map((i) => ({
      ...i,
      post_id: response.data.id,
    }));

    response = await axios({
      method: "put",
      url: "https://api.devonnex.tech/api/v1/paragraphs/",
      data: paraData,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Creates a gig
const createGig = async ({ reqData, sectionData }) => {
  try {
    let response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/gigs/",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    sectionData.section = sectionData.section.map((i) => ({
      header: i.header,
      description: i.description,
      bullets: i.bullets,
      gig_id: response.data.id,
    }));

    response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/sections/",
      data: sectionData,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Creates a gig
const createProposal = async ({ reqData, sectionData }) => {
  try {
    let response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/proposals/",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    sectionData.proposal_section = sectionData.proposal_section.map((i) => ({
      header: i.header,
      description: i.description,
      bullets: i.bullets,
      proposal_id: response.data.id,
    }));

    response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/proposal_sections/",
      data: sectionData,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};

// Updates a gig
const updateGig = async ({ reqData, sectionData }) => {
  try {
    let response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/gigs/${reqData.gig.id}`,
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    sectionData.section = sectionData.section.map((i) => ({
      header: i.header,
      description: i.description,
      bullets: i.bullets,
      gig_id: response.data.id,
      id: i.id,
    }));

    response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/sections/`,
      data: sectionData,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
// Updates a gig
const updateProposal = async ({ sectionData, sectionId }) => {
  sectionData.proposal_section = sectionData.proposal_section.map((i) => ({
    header: i.header,
    description: i.description,
    bullets: i.bullets,
    proposal_id: sectionId,
    id: i.id,
  }));

  try {
    const response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/proposal_sections/`,
      data: sectionData,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};

// Updates a gig
const updateHiring = async ({ gig, gigUser, proposalUser }) => {
  try {
    let response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/gigs/${gig.id}`,
      data: gig,
      headers: { "Content-Type": "application/json" },
    });

    response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/users/${gigUser[1]}`,
      data: { user: { revenue: gigUser[0] } },
      headers: { "Content-Type": "application/json" },
    });

    response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/users/${proposalUser[1]}`,
      data: { user: { revenue: proposalUser[0] } },
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};

const deleteModels = async (url) => {
  try {
    let response = await axios.delete(url);
  } catch (err) {
    throw err;
  }
};

// Retrieves a gig
const getGig = async ({ queryKey }) => {
  if (!queryKey[1]) return;
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/gigs/${queryKey[1]}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Creates a talent
const createTalent = async ({ photoData, reqData }) => {
  try {
    const photoIdResponse = await axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dqzvvp77h/auto/upload",
      data: photoData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const photoId = photoIdResponse.data.public_id;

    reqData.talent["ads_url"] = photoId;
    const response = await axios({
      method: "post",
      url: "https://api.devonnex.tech/api/v1/talents/",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Updates a talent
const updateTalent = async ({ photoData, reqData }) => {
  try {
    if (photoData) {
      const photoIdResponse = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/dqzvvp77h/auto/upload",
        data: photoData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photoId = photoIdResponse.data.public_id;

      reqData.talent["ads_url"] = photoId;
    }

    const response = await axios({
      method: "put",
      url: `https://api.devonnex.tech/api/v1/talents/${reqData.talent.id}`,
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};

// Retrieves a talent
const getTalent = async ({ queryKey }) => {
  if (!queryKey[1]) return;
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/talents/${queryKey[1]}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Retrieves a talent
const getProposal = async ({ queryKey }) => {
  if (!queryKey[1]) return;
  try {
    const response = await axios.get(
      `https://api.devonnex.tech/api/v1/proposals/${queryKey[1]}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Retrieves contacts for a user
const getContacts = async (user) => {
  try {
    const response = await axios.get(
      `https://chat.devonnex.tech/app/contacts?username=${user}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Adds a new user contact
const newUserContact = async (reqData) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://chat.devonnex.tech/app/verify",
      data: reqData,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.data.status) {
      throw new Error("Request failed with status " + response.status);
    }

    return {
      ...reqData,
      photo: response.data.photo,
      last_activity: Date.now() / 1000,
    };
  } catch (err) {
    throw err;
  }
};

// Fetches chat history between two users
const fetchChatHistory = async (user1, user2) => {
  try {
    const response = await axios.get(
      `https://chat.devonnex.tech/app/chats?user1=${user1}&user2=${user2}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Sends a message
const sendMessage = async (messageData) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://chat.devonnex.tech/app/send",
      data: messageData,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.data.status) {
      throw new Error("Request failed with status " + response.status);
    }

    return response.data;
  } catch (err) {
    throw err;
  }
};

export {
  checkIfUserExist,
  getUser,
  chatLogin,
  createUser,
  createPost,
  getPost,
  updatePost,
  createGig,
  updateGig,
  getGig,
  deleteModels,
  createTalent,
  updateTalent,
  getTalent,
  getContacts,
  newUserContact,
  fetchChatHistory,
  sendMessage,
  updateHiring,
  createProposal,
  getProposal,
  updateProposal,
  fetchUserGigs,
  fetchUserReviews,
  fetchUserComments,
};
