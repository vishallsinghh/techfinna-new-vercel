import React from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import BlogsList from "@/components/BlogsList/BlogsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stay informed with the latest articles on integrating Odoo with Power BI, Tableau, Looker, Google Sheets, and React. Learn about building custom dashboards and cutting-edge connectors to enhance your business insights",
};

async function fetchBlogs() {
  const querySnapshot = await getDocs(collection(db, "vishalTesting"));
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data;
}
const Page = async () => {
  const blogs = await fetchBlogs();
  return (
    <div className="mt-24">
      <BlogsList props={blogs} />
    </div>
  );
};

export default Page;
