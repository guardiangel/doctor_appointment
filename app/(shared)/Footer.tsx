import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-wh-900 text-wh-50 py-10 px-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        {/**first column */}
        <div className="mt-16 basis-1/2 sm:m-0">
          <h4 className="font-bold">Blog of the future</h4>
          <p className="my-5">This is the blog of the future.</p>
          <p>Blog of the future, All rights reserved</p>
        </div>
        {/**second column */}
        <div className="mt-16 basis-1/4 sm:m-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Middle content.</p>
          <p className="my-5">Another content.</p>
          <p>Last content</p>
        </div>
        {/**third column */}
        <div className="mt-16 basis-1/4 sm:m-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">(647)8639650.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
