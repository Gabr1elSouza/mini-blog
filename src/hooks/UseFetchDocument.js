import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, SetDocument] = useState(null);
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) {
        return;
      }

      SetLoading(true);
      try {
        const docRef= await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        SetDocument(docSnap.data())
        SetLoading(false);
      } catch (error) {
        console.log(error)
        SetError(error.message)
        SetLoading(false);
      }

      
    }
    loadDocument();
  }, [docCollection, id, cancelled]);
  console.log(document);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
