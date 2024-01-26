import { Editor } from "@tiptap/react";
import React from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormattedPost } from "@/app/type";

type Props = {
  isEditable: boolean;
  handleIsEditable: (isEditor: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  tempTitle: string;
  setTempTitle: (tempTitle: string) => void;
  tempContent: string;
  setTempContent: (tempContent: string) => void;
  editor: Editor | null;
  post: FormattedPost;
};

const CategoryAndEditor = ({
  isEditable,
  handleIsEditable,
  title,
  setTitle,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  editor,
  post,
}: Props) => {
  const handleEnableEdit = () => {
    handleIsEditable(!isEditable);
    setTempTitle(title);
    setTempContent(editor?.getHTML() || "");
  };

  const handleCancelEdit = () => {
    handleIsEditable(!isEditable);
    setTitle(tempTitle);
    editor?.commands.setContent(tempContent);
  };

  return (
    <div className="flex justify-items-center">
      <h4 className="bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold">
        {post.category}
      </h4>
      <div className="mt-4">
        {isEditable ? (
          <div className="flex justify-bewteen gap-3">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        ) : (
          <div className="flex justify-bewteen gap-3">
            <button onClick={handleEnableEdit}>
              <PencilSquareIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryAndEditor;
