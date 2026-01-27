import Blogs from "@/components/Blogs/Blogs";
import { db } from "../../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const generateStaticParams = async () => {
  const querySnapshot = await getDocs(collection(db, "vishalTesting"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  const slugArray = data.map((blog) => {
    return { slug: blog.slug };
  });
  return slugArray;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const querySnapshot = await getDocs(collection(db, "vishalTesting"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  const singleBlog = doc(db, `vishalTesting/${params.slug}`);
  const docSnap = await getDoc(singleBlog);
  const single: any = docSnap.data();
  return (
    <div className="mt-[100px]">
      <Blogs singleBlog={single} />
    </div>
  );
}
