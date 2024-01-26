"use client";
import { FormattedPost } from "@/app/type";
import React, { useState } from "react";

import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./EditorMenuBar";
import CategoryAndEditor from "./CategoryAndEditor";
import Article from "./Article";

type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post?.title);
  const [titleError, setTitleError] = useState<string>("");
  const [content, setContent] = useState<string>(post?.content);
  const [contentError, setContentError] = useState<string>();

  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>(content);

  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleEnableEdit = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };

  function handleOnChangeContent({ editor }: any): void {
    if (!(editor as Editor).isEmpty) {
      setContentError("");
    }
    setContent((editor as Editor).getHTML());
  }

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handleOnChangeContent,
    content: content,
    editable: isEditable,
  });

  const handleSubmit = () => {};

  //use Tailwind to fix the css not working issue.
  return (
    <div className="prose w-full max-w-full mb-10">
      {/**breadscrumb */}
      <h5 className="text-wh-300">{`Home>${post.category}>${post.title}`}</h5>
      {/**category and edit */}
      <CategoryAndEditor
        isEditable={isEditable}
        handleIsEditable={handleEnableEdit}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        post={post}
      />
      <form onSubmit={handleSubmit}>
        {/**header */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              ></textarea>
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
          </div>
        </>

        {/**Image */}
        <div className=" relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            alt={post.title}
            src={post.image}
            sizes="(max-width:480px) 100vw,
          (max-width:768px) 85vw,
          (max-width:1060px) 75vw,
          60vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/**
         *article
         */}
        <Article
          contentError={contentError}
          editor={editor}
          isEditable={isEditable}
          setContent={setContent}
          title={title}
        />

        {/**submit button */}
        {isEditable && (
          <div className=" flex justify-end">
            <button
              type="submit"
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
            >
              SUBMIT
            </button>
          </div>
        )}
      </form>
      {/**social links */}
      <div className="hidden md:block mt-10 w-1/3">
        <SocialLinks isDark />
      </div>
    </div>
  );
};

export default Content;
