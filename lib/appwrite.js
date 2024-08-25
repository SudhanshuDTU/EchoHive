import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sudhanshujha.echohive",
  projectId: "66c6eefb00355ca6288e",
  databaseId: "66c6fb72001ae252f62d",
  userCollectionId: "66c6fbc4002822f3a40a",
  videoCollectionId: "66c6fbf70035aca8987d",
  storageId: "66c6fdc700234b113de8",
  bookmarkCollectionId: "66c9872100316a6f58c5"
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw Error;
    }
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) {
      throw Error;
    }
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async()=>{
    try {
        const posts = await database.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.orderDesc('$createdAt')])
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
export const getLatestPosts = async()=>{
    try {
        const posts = await database.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.orderDesc('$createdAt',Query.limit(7))])
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
export const searchPosts = async(query)=>{
    try {
        const posts = await database.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.search('title',query)])
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
export const getUserPosts = async(userId)=>{
    try {
        const posts = await database.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.equal('creator',userId),Query.orderDesc('$createdAt')])
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
export const signOut = async()=>{
    try {
       const session = await account.deleteSession('current')
       return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId,type)=>{
  let fileUrl;
  try {
    if(type === 'video'){
      fileUrl = storage.getFileView(appwriteConfig.storageId,fileId)
    }else if(type === 'image'){
      fileUrl = storage.getFilePreview(appwriteConfig.storageId,fileId,2000,2000,'top',100)
    }else{
      throw new Error('Invalid File type')
    }

    if(!fileUrl){
      throw Error;
    }
    return fileUrl;
    
  } catch (error) {
    throw new Error(error)
  }

}

export const uploadFile = async (file,type)=>{
  if(!file)return;
  
  const asset = {
    name:file.fileName || 'upload',
    type:file.type ,
    size: file.fileSize,
    uri: file.uri
  }
  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId,ID.unique(),asset)
    const fileUrl = await getFilePreview(uploadedFile.$id,type)
    return fileUrl;
  } catch (error) {
    throw new Error(error)
  }
}

export const createVideo = async(form)=>{
  
  try {
    const [thumbnailUrl,videoUrl] = await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ])
      const newPost = await database.createDocument(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,ID.unique(),{title:form.title,thumbnail:thumbnailUrl,video:videoUrl,prompt: form.prompt,creator:form.userId})
      return newPost;
  } catch (error) {
      throw new Error(error)
  }
}

export const createBookmark = async (videoId) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not logged in");
    }

    const bookmark = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarkCollectionId, 
      ID.unique(),
      {
        userId: currentUser.$id,
        videoId: videoId,
      }
    );

    return bookmark;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getBookmarkedVideos = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not logged in");
    }

    const bookmarks = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarkCollectionId, 
      [Query.equal("userId", currentUser.$id)]
    );
    if (bookmarks.total === 0) {
      return [];
    }

    const videoIds = bookmarks.documents.map((bookmark) => bookmark.videoId);
    if (videoIds.length === 0) {
      return []; // No bookmarked videos to fetch
    }

    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("$id", videoIds)]
    );

    return videos.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};