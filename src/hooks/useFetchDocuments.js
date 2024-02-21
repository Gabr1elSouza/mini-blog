import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, SetDocuments] = useState(null);
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      SetLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        //busca
        if (search) {
          q = await query(
            collectionRef,
            where("tagsAray", "array-contains", ""),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        //dashboard

        q = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          SetDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        SetError(error.message);
        SetLoading(false);
      }
      SetLoading(false);
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);
  console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, document, loading, error };
};
