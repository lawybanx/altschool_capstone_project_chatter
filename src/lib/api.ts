import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { increment } from 'firebase/firestore';

type UserData = {
  name: string | null | undefined;
  username: any;
  profile: string | null;
  createdAt: string | undefined;
};

type PostData = {
  cvImg: string;
  id: string;
  title: string;
  tags: string[];
  MDEValue: string;
  draft?: boolean;
  updated?: boolean;
};

type ProfileData = {
  username?: string;
  profile?: null | string;
  name?: string;
  createdAt?: string;
  id?: string;
  twitter?: string;
  website?: string;
  location?: string;
  email?: string;
  github?: string;
  followers?: string[];
  following?: string[];
  followingTags?: string[];
};

type CommentData = {
  commentId: string;
  value: string;
  createdAt: { seconds: number; nanoseconds: number };
  edited?: boolean;
  editedAt?: { seconds: number; nanoseconds: number };
  likes: string[];
  userId: string;
  replies: Record<string, Reply>;
}

type Reply = {
  commentId: string;
  value: string;
  createdAt: { seconds: number; nanoseconds: number };
  edited?: boolean;
  editedAt: { seconds: number; nanoseconds: number };
  likes: string[];
  userId: string;
  repliedUserId: string;
}

export const uploadImage = async (
  img: File,
  selectedImgPath: string
): Promise<string> => {
  const cvImgRef = ref(storage, selectedImgPath);
  await uploadBytes(cvImgRef, img);

  return await getDownloadURL(cvImgRef);
};

export const removeImage = async (url: string): Promise<void> => {
  const desertRef = ref(storage, url);
  await deleteObject(desertRef);
};

export const createUser = async (
  userId: string,
  userData: UserData
): Promise<void> => {
  await setDoc(doc(db, 'users', userId), userData, { merge: true });
};

export const createPost = async (postData: PostData): Promise<void> => {
  await addDoc(collection(db, 'posts'), {
    ...postData,
    createdAt: serverTimestamp(),
    comments: [],
    draft: false,
    likes: [],
    readTime: Math.ceil(postData.MDEValue.trim().split(/\s+/).length / 200),
  });
};

export const draftPost = async (postData: PostData): Promise<void> => {
  await setDoc(doc(db, 'posts', postData.id), {
    ...postData,
    comments: [],
    likes: [],
  });
};

export const editPost = async (postData: PostData): Promise<void> => {
  const docRef = doc(db, 'posts', postData.id);

  await updateDoc(docRef, {
    ...postData,
    updatedAt: serverTimestamp(),
    readTime: Math.ceil(postData.MDEValue.trim().split(/\s+/).length / 200),
  });
};

export const deletePost = async (postId: string): Promise<void> => {
  const docRef = doc(db, 'posts', postId);

  await deleteDoc(docRef)
    .then(() => {})
    .catch(err => console.log(err));
};

export const updateProfileData = async (
  profileData: ProfileData,
  userId: string | any
): Promise<void> => {
  const docRef = doc(db, 'users', userId);

  await updateDoc(docRef, profileData);
};

export const updateComment = async (
  comments: CommentData[],
  postId: string
): Promise<void> => {
  const docRef = doc(db, 'posts', postId);

  await updateDoc(docRef, { comments });
};

export const updatePostReaction = async (
  data: any,
  postId: string
): Promise<void> => {
  const docRef = doc(db, 'posts', postId);

  await updateDoc(docRef, data);
};

export const addView = async (postId: string): Promise<void> => {
  const docRef = doc(db, 'posts', postId);

  await updateDoc(docRef, { views: increment(1) });
};
