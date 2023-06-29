import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Data {
  id: string;
  [key: string]: any;
}

const useGetData = <T extends Data>(colName: 'posts' | 'users') => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    let colRef: any;
    if (colName === 'posts') {
      colRef = collection(db, 'posts');
    } else if (colName === 'users') {
      colRef = collection(db, 'users');
    }

    onSnapshot(
      colRef,
      { includeMetadataChanges: true },
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.metadata.hasPendingWrites) {
          if (snapshot.docs.length === 0) {
            setLoading(false);
            setErr(true);

            return;
          }

          setLoading(false);
          setErr(false);

          const newData: T[] = [];
          snapshot.docs.forEach(doc => {
            newData.push({ ...doc.data(), id: doc.id } as T);
          });

          setData(newData);
        }
      }
    );
  }, [colName]);

  return { data, loading, err };
};

export default useGetData;
